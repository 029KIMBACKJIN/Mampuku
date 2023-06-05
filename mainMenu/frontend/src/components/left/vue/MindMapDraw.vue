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
        width:{type:Number,default:10000},
        height:{type:Number,default:10000}
    },
    data: () => ({
        isCreateNode:false,
        isEditNode:false,
        findUserIntervalID:null,
        nodes:{}
    }),
    components: {
        MindMapNode
    },
    mounted(){
        console.log("ページが読み込まれました");
        //svgタグを定義
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute("id", "canvas");
        svg.setAttribute("width", this.width);
        svg.setAttribute("height", this.height);
        svg.setAttribute("viewbox", ("0 0 " + "1000" + " " + "1000"));
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
            //ページのリロードするとデータが失われるので、その時はエラーする。
            this.nodes[this.resDatas.id].data.TaskNode.taskName = this.resDatas.title;
            this.nodes[this.resDatas.id].data.TaskNode.deadline = this.resDatas.deadline;
        },
        isTaskDelete:function(){
            //削除命令が執行されたら
            var i = this.resDatas.id;
            var node = this.nodes[i].data;  //対象ノードのキーを取得
            var parentNode = node.ParentNode.node;
            var childNode = node.ChildNode.node;
            //親ノードがいる場合
            if(parentNode != null){
                //親ノードが持つ子ノードのキーの配列
                let parentChildKeys = Object.keys(parentNode.data.ChildNode.node);
                //削除するノードの親ノードの子ノードに登録されている自分のノードを削除する
                for(var j = 0; j < parentChildKeys.length; j++){
                    //見つかったら削除
                    if(parentNode.data.ChildNode.node[parentChildKeys[j]].data.TaskNode.id == this.resDatas.id){
                        console.log("見つかった！");
                        //親ノードに登録されている子ノードを削除。
                        delete parentNode.data.ChildNode.node[parentChildKeys[j]];
                        //削除対象につながっているline2も同様に削除
                        delete parentNode.data.TaskNode.line2[parentChildKeys[j]];
                    }                    
                }
            }
            //子ノードがいる場合
            if(childNode != {}){
                //親ノードが持つ子ノードのキー(こっちは配列ではない)
                //let ParentKey = parentNode.data.TaskNode.id;
                let childKeys = Object.keys(childNode);
                //削除するノードの子ノードの親ノードに登録されている自分のノードを削除する
                for(j = 0; j < childKeys.length; j++){
                    //もしルートノードを消したなら
                    if(parentNode == null){
                        //親ノードと、親ノードに向かう線をnullに
                        childNode[childKeys[j]].data.ParentNode.node = null;
                        childNode[childKeys[j]].data.TaskNode.line1 = null;
                    }
                    else{
                        //子供たちを削除する親ノードにつなげる
                        childNode[childKeys[j]].data.ParentNode.node = parentNode;
                        //線も同様に削除するノードの親ノードのキーにつなげる。親ノード側も子ノードの参照先を追加
                        parentNode.data.TaskNode.line2[childKeys[j]] = childNode[childKeys[j]].data.TaskNode.line1;
                        childNode[childKeys[j]].data.TaskNode.line1 = parentNode.data.TaskNode.line2[childKeys[j]];                    
                    }
                }                
            }
            //該当の辞書要素を削除
            delete this.nodes[i];
            //htmlを削除 idは１からなので-1する必要あり
            var element = document.getElementById("node_" + (i - 1));
            element.remove();
        }
    },
    methods:{
        findUser:function(){
            //ログインするまで定期的に呼ばれ続けるメソッド
            const b = sessionStorage.getItem("login");
            console.log(b);
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
            console.log("ダブルクリックした。データ：" + event.target.id);
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
                .catch((e)=>{
                    alert(e);
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
            wrapper.setAttribute("id", "node_" + Object.keys(this.nodes).length);
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
            line1.setAttribute("id", "line1");
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
            if(Object.keys(this.nodes).length >= 2){
                //親ノードと子ノードのインスタンスをお互いに設定する
                //var child = this.nodes[this.nodes.length - 1];  //childは最終ノードで問題ない
                //var parent = this.nodes[data.parentId - 1];
                var child = this.nodes[data.id];   //追加処理中のノードのこと
                var parent = this.nodes[data.parentId];  //キーでアクセスしているためバグらない。
                //[1].parentNode.node = [0]...
                //this.nodes[this.nodes.length - 1].data.ParentNode.node = this.nodes[this.nodes.length - 2];
                //子ノードの親は１つしか現在指定できないのでこれでいいはず。
                child.data.ParentNode.node = parent;
                //[0].childNode.node = [1]...
                if(parent != null){
                    //親側からみた子ノードは複数ある可能性がある
                    //parent.data.ChildNode.node.push(child);
                    //辞書登録
                    parent.data.ChildNode.node[child.data.TaskNode.id] = child;
                }
                //子ノードへの線を設定する
                if(Component._instance.data.ParentNode.node != null){
                    Component._instance.data.ParentNode.node.data.TaskNode.line2[child.data.TaskNode.id] = line1;
                }
            }
            document.getElementById("canvas").appendChild(line1);
            /*
            if(Component._instance.data.ParentNode.id >= 0 && this.nodes.length % 2 == 0){
            }
            if(Component._instance.data.ChildNode.id >= 0 && this.nodes.length % 2 == 0){
            }
            */
           /*
            const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line2.setAttribute("id", "line2");
            line2.setAttribute("x1", Component._instance.data.TaskNode.x);
            line2.setAttribute("y1", Component._instance.data.TaskNode.y);
            line2.setAttribute("x2", Component._instance.data.ChildNode.x);
            line2.setAttribute("y2", Component._instance.data.ChildNode.y);
            line2.setAttribute('stroke', '#008080');
            line2.setAttribute('stroke-width', 5);

            Component._instance.data.TaskNode.line2 = line2;
            if(Component._instance.data.ChildNode.node != null){
                Component._instance.data.ChildNode.node.TaskNode.line1 = line2;
            }
            document.getElementById("canvas").appendChild(line2);
            */

            var keys = Object.keys(this.nodes);
            for(var i = 0; i < keys.length; i++){
                console.log("key = " + keys[i]);
                var d = this.nodes[keys[i]];
                console.log("登録されているノード:" + d.data);
            }
            //MindMapDrawというidを持つ要素の中に入れる


            document.getElementById("MindMapDraw").appendChild(wrapper);

        }
    }
}
</script>

<style src="../css/MindMapDraw.css"></style>
