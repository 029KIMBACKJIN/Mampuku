<template>
    <!--translateでドラッグ移動、scaleでサイズ変更がパラメータでできる
        MindMapDraw内であればドラッグを有効にする。ドラッグ中に枠から出たら強制的にドラッグ解除
    -->
    <div id = "MindMapDraw" 
    style="position: relative;"
    v-on:dblclick="mouseDoubleClick($event)"
    v-on:position="setLinePosition"
    >
        <!--ここにsvgタグを動的に定義して生成-->

        <!--このノードは見えなくする-->
        <div v-show="false">
            <MindMapNode />
        </div>
    
    </div>
</template>

<script>
import MindMapNode from './MindMapNode.vue';
import { createApp } from "vue"
import axios from 'axios';
import { getAuth } from 'firebase/auth';
//ここにタスク追加画面用のvueファイルをインポートしてパラメータを貰う。
//そのパラメータの状態によってv-ifでイベントを発火させる。

//タスクアイコンをクリックしたらmethodで呼び出す。
//isCreateNode=作られたタスクがあるかどうか。外部から作られたかどうかの状態を取得して
//v-if:isCreateNodeで発火する。
export default{
    name: "MindMapDraw",
    props: {
        isTaskCreated:Boolean,
        isTaskEdit:Boolean,
        isTaskDelete:Boolean,
        resDatas:Object,
    },
    data: () => ({
        isCreateNode:false,
        isEditNode:false,
        findUserIntervalID:null,
        width:10000,
        height:10000,
        nodes:{}
    }),
    components: {
        MindMapNode
    },
    mounted(){
        console.log("ページが読み込まれました");
        //svgタグを定義
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        //let e = document.getElementById("MindMapDraw");
        //ウィンドウサイズに合わせる
        //this.width = e.clientWidth + window.innerWidth;    
        //this.height = e.clientHeight + window.innerHeight;
        svg.setAttribute("id", "canvas");
        svg.setAttribute("width", this.width);
        svg.setAttribute("height", this.height);
        svg.setAttribute("viewbox", (-this.width +  " 0 " + this.width + " " + this.height));
        svg.setAttribute("style", "background-color:aqua");
        document.getElementById("MindMapDraw").appendChild(svg);  

        //1秒間隔で処理を呼ぶ。
        this.findUserIntervalID = setInterval(this.findUser, 1000);
    }
    ,
    watch:{
        isTaskCreated:function(){
            console.log("タスクが作成されました！！！");
            console.log("到着データ\n" + 
            this.resDatas.id + "\n" + 
            this.resDatas.title + "\n" + 
            this.resDatas.contents + "\n" + 
            this.resDatas.deadline + "\n" + 
            this.resDatas.complete + "\n" + 
            this.resDatas.parentId + "\n" + 
            this.resDatas.childId );

            this.createNode(this.resDatas);
        },
        isTaskEdit:function(){
            let currentNode = this.nodes[this.resDatas.id];
            //ページのリロードするとデータが失われるので、その時はエラーする。
            currentNode.data.TaskNode.taskName = this.resDatas.title;
            currentNode.data.TaskNode.deadline = this.resDatas.deadline;
            currentNode.data.TaskNode.resetIntervalSwi = !currentNode.data.TaskNode.resetIntervalSwi;
            console.log(currentNode.data.TaskNode.resetIntervalSwi);
            //編集したノードの親ノードに登録されている編集したノード情報を一度削除
            if(currentNode.data.ParentNode.node != null){
                delete currentNode.data.ParentNode.node.data.ChildNode.node[this.resDatas.id];
            }
            this.changeParent(this.resDatas.id, this.resDatas.parentId, this.nodes[this.resDatas.id]);
        },
        isTaskDelete:function(){
            this.deleteNode();
        }
    },
    methods:{
        findUser:function(){
            //ログインするまで定期的に呼ばれ続けるメソッド
            const b = sessionStorage.getItem("login");
            if(b != null){
                const user = getAuth().currentUser;
                console.log("ログインしました");
                clearInterval(this.findUserIntervalID);
                //リロードするとデータ（フロント側のみ）が消えてしまうので、リロードの際に、ユーザーの全てのデータを取り出すようにする。
                axios.post("/MindMap/all",{
                    uid: user.uid
                })
                .then((res) =>{
                    console.log(res.data);
                    for(var i = 0; i < res.data.length; i++){
                        this.createNode(res.data[i]);
                    }
                }).catch((e)=>{
                    alert(e);
                })
                sessionStorage.removeItem("login");
            }
        },
        mouseDoubleClick: function(event){
            //console.log("ダブルクリックした。データ：" + event.target.id);
            //MindMapNodeから以下をやろうとすると、TaskEditへデータを送れない。
            if(event.target.id != "canvas"){
                axios.post("/MindMap/doubleClick", {
                    id: event.target.id
                })
                .then((res) => {
                    //alert(res.data.title);
                    this.isEditNode = !this.isEditNode;
                    this.$emit("isEditFlag", this.isEditNode);
                    this.$emit("resEditDatas", res.data);
                })
                .catch(()=>{
                    alert("このノードは存在しません。削除に失敗している可能性があります。\nもう一度削除を実行します。");
                    this.deleteNode();
                })
            }
        },
        mouseClickUp:function(){
        },
        createNode:function(data){
            //コンポーネントを生成する
            const Component = createApp(MindMapNode);
            //divというタグの要素を生成する
            const wrapper = document.createElement("div");
            wrapper.setAttribute("id", "node_" + data.id);
            //TaskEditのmouseDoubleClickメソッドを呼び出すようにする
            //setAttributeでv-onと書いてメソッド指定でも反応するらしい
            //wrapperのタグ内に生成したコンポーネントを入れる。
            Component.mount(wrapper);

            //データベースから親ノードのidと、タスク名をタスク作成画面の命令から取り出して、idとnodesの添え字が一致するものを探す
            //var ParentComponent = ;
            //タスク作成画面から得た情報から、タスク名を取り出す
            //var taskName = ;
            //データベースに登録されているタスクのid, 名前を代入する。
            Component._instance.data.TaskNode.id = data.id;
            Component._instance.data.TaskNode.taskName = data.title;
            Component._instance.data.TaskNode.drawHeight = this.height;
            Component._instance.data.TaskNode.deadline = data.deadline;


            //lineタグを生成
            //Component._instanceがchildNodeか、parentNodeのidが-1ではないならそこだけ線を描画する。
            //ただし線の描画はノードの数が偶数個のときだけ
            const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.setAttribute("id", "line1_" + data.id);
            line1.setAttribute("x1", Component._instance.data.TaskNode.x);
            line1.setAttribute("y1", Component._instance.data.TaskNode.y);
            line1.setAttribute("x2", Component._instance.data.ParentNode.x);
            line1.setAttribute("y2", Component._instance.data.ParentNode.y);
            line1.setAttribute('stroke', '#008080');
            line1.setAttribute('stroke-width', 5);

            //親ノードへの線を設定する
            Component._instance.data.TaskNode.line1 = line1;
            //データベースに親ノードの子ノード情報を更新する。

            //this.nodes.push(Component._instance);
            //数字をキーとするノードを追加
            this.nodes[data.id.toString()] = Component._instance;

            this.changeParent(data.id, data.parentId, Component._instance);

            document.getElementById("canvas").appendChild(line1);

            /*
            var keys = Object.keys(this.nodes);
            for(var i = 0; i < keys.length; i++){
                //console.log("key = " + keys[i]);
                var d = this.nodes[keys[i]];
                //console.log("登録されているノード:" + d.data);
            }
            */
            //MindMapDrawというidを持つ要素の中に入れる


            document.getElementById("MindMapDraw").appendChild(wrapper);

        },
        deleteNode:function(){
            //削除命令が執行されたら
            var i = this.resDatas.id;
            var node = this.nodes[i].data;  //対象ノードのキーを取得
            var parentNode = node.ParentNode.node;
            var childNode = node.ChildNode.node;
            //console.log("削除ノード：" + node + "親ノード：" + parentNode + "子ノード：" + childNode);

            this.parentInfFix(parentNode);

            this.childInfFix(childNode, parentNode);

            //該当の辞書要素を削除
            clearInterval(this.nodes[i].data.TaskNode.intervalId);
            delete this.nodes[i];
            //ノードと線のhtmlを削除
            let element = document.getElementById("node_" + i);
            let line1Element = document.getElementById("line1_" + i);
            element.remove();
            line1Element.remove();

        },
        parentInfFix:function(parentNode){
            //削除するノードの親ノード情報の修正処理
            //削除するノードに親ノードがいる場合
            if(parentNode != null){
                //親ノードが持つ子ノードのキーの配列
                let parentChildKeys = Object.keys(parentNode.data.ChildNode.node);
                console.log(parentChildKeys);
                //削除するノードの親ノードの子ノードに登録されている自分のノードを削除する
                for(var j = 0; j < parentChildKeys.length; j++){
                    //見つかったら削除
                    if(parentNode.data.ChildNode.node[parentChildKeys[j]].data.TaskNode.id == this.resDatas.id){
                        //console.log("見つかった！ノードキー：" + parentChildKeys[j]);
                        //親ノードに登録されている子ノードを削除。
                        delete parentNode.data.ChildNode.node[parentChildKeys[j]];
                        //削除対象につながっているline2も同様に削除
                        delete parentNode.data.TaskNode.line2[parentChildKeys[j]];

                        //削除は１つだけなのでループを出る
                        break;
                    }                    
                }
            }
        },
        childInfFix:function(childNode, parentNode){
            //削除するノードの子ノード情報の修正処理
            //削除するノードに子ノードがいる場合
            if(Object.keys(childNode).length != 0){
                let childKeys = Object.keys(childNode);
                //console.log("子ノード：" + childKeys);
                //削除するノードの子ノードの親ノードに登録されている自分のノードを削除する
                for(let j = 0; j < childKeys.length; j++){
                    //もしルートノードを消したなら
                    if(parentNode == null){
                        //親ノードと、親ノードに向かう線をnullに
                        childNode[childKeys[j]].data.ParentNode.node = null;
                        childNode[childKeys[j]].data.ParentNode.x = 0;
                        childNode[childKeys[j]].data.ParentNode.y = 0;
                    }
                    else{
                        //親ノードに新しく子ノードを追加
                        parentNode.data.ChildNode.node[childKeys[j]] = childNode[childKeys[j]];
                        //親ノードに親から子への線の情報を紐づける
                        parentNode.data.TaskNode.line2[childKeys[j]] = childNode[childKeys[j]].data.TaskNode.line1;

                        //子供たちを、削除するノードの親ノードにつなげる
                        childNode[childKeys[j]].data.ParentNode.node = parentNode;
                        //childNodeのParentNodeの座標の参照先をparentNodeにしておく処理を追記

                        //線も同様に削除するノードの親ノードのキーにつなげる。親ノード側も子ノードの参照先を追加
                        //childNode[childKeys[j]].data.ParentNode.node.data.TaskNode.line2[childKeys[j]] = childNode[childKeys[j]].data.TaskNode.line1;
                        childNode[childKeys[j]].data.TaskNode.line1 = parentNode.data.TaskNode.line2[childKeys[j]];
                    }
                }                
            }
        },
        changeParent:function(childId, parentId, currentNode){
            if(Object.keys(this.nodes).length >= 2){
                //親ノードと子ノードのインスタンスをお互いに設定する
                var child = this.nodes[childId];   //追加処理中のノードのこと
                var parent = this.nodes[parentId];  //キーでアクセスしているためバグらない。
                //子ノードの親は１つしか現在指定できないのでこれでいいはず。
                child.data.ParentNode.node = parent;
                //[0].childNode.node = [1]...
                if(parent != null){
                    //親側からみた子ノードは複数ある可能性がある
                    //辞書登録
                    parent.data.ChildNode.node[child.data.TaskNode.id] = child;
                }
                //子ノードへの線と親ノードへの線を設定する
                if(currentNode.data.ParentNode.node != null){
                    currentNode.data.ParentNode.node.data.TaskNode.line2[child.data.TaskNode.id] = currentNode.data.TaskNode.line1;
                    currentNode.data.TaskNode.line1 = currentNode.data.ParentNode.node.data.TaskNode.line2[child.data.TaskNode.id];
                }
            }
        }
    }
}
</script>

<style src="../css/MindMapDraw.css"></style>
