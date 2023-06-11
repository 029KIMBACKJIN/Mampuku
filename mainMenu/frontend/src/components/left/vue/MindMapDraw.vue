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
            //タイトル、締め切り日を修正する
            currentNode.data.TaskNode.taskName = this.resDatas.title;
            currentNode.data.TaskNode.deadline = this.resDatas.deadline;
            currentNode.data.TaskNode.resetIntervalSwi = !currentNode.data.TaskNode.resetIntervalSwi;
            console.log(currentNode.data.TaskNode.resetIntervalSwi);
            //編集したノードの親ノード(複数)に登録されている編集したノード情報を一度削除
            let parentIds = this.resDatas.parentId.split(',');   //変更後の親ノード情報について
            let beforeParentIds = this.resDatas.beforeParentId.split(',');  //前の親ノード情報について

            console.log("new parent:" + parentIds);
            console.log("before parent:" + beforeParentIds);
            //線と情報を再構成する
            this.changeLine(currentNode, beforeParentIds, parentIds);
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

            var parentIds = data.parentId.split(",");
            for(let i = 0; i < parentIds.length; i++){

                const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line1.setAttribute("id", "line1_" + data.id + "_" + parentIds[i]);
                line1.setAttribute("x1", Component._instance.data.TaskNode.x);
                line1.setAttribute("y1", Component._instance.data.TaskNode.y);
                line1.setAttribute("x2", Component._instance.data.ParentNode.x);
                line1.setAttribute("y2", Component._instance.data.ParentNode.y);
                line1.setAttribute('stroke', '#008080');
                line1.setAttribute('stroke-width', 5);

                Component._instance.data.TaskNode.line1[parentIds[i]] = line1;
                document.getElementById("canvas").appendChild(line1);
            }
            //親ノードへの線を設定する
            //Component._instance.data.TaskNode.line1 = line1;
            //データベースに親ノードの子ノード情報を更新する。

            //this.nodes.push(Component._instance);
            //数字をキーとするノードを追加
            this.nodes[data.id.toString()] = Component._instance;

            this.changeParent(data.id, data.parentId);


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
            var parentNode = node.ParentNode.node;   //辞書型
            var childNode = node.ChildNode.node;    //辞書型
            //console.log("削除ノード：" + node + "親ノード：" + parentNode + "子ノード：" + childNode);

            //親ノードが持つ削除ノードの情報を削除
            this.parentInfFix(parentNode, i);
            //子ノードたちを新しい親ノードにつなげる（情報＋線も）
            this.childInfFix(childNode, parentNode, i);

            clearInterval(this.nodes[i].data.TaskNode.intervalId);
            //ノードと線のhtmlを削除
            let parentIds = Object.keys(parentNode);
            //削除するノードのhtmlについて
            let element = document.getElementById("node_" + i);
            //親ノードが存在しないなら
            if(parentIds.length == 0){
                //原点への線を消してしまう。
                this.nodes[i].data.TaskNode.line1[Object.keys(this.nodes[i].data.TaskNode.line1)[0]].remove();
            }
            else{
                for(let j = 0; j < parentIds.length; j++){
                    //console.log("line1_" + j + "_" + parentIds[j]);
                    let line1Element = document.getElementById("line1_" + i + "_" + parentIds[j]);
                    if(line1Element != null){
                        line1Element.remove();
                    }
                }
            }
            element.remove();

            //該当の辞書要素を削除
            delete this.nodes[i];

        },
        //削除するノードの親ノードに登録されている削除ノードの情報を消すための処理
        parentInfFix:function(parentNode, parentKey){
            //削除するノードの親ノード情報の修正処理
            //削除するノードに親ノードがいる場合
            let parentKeys = Object.keys(parentNode);
            for(let i = 0; i < parentKeys.length; i++){
                if(parentNode[parentKeys[i]] != null){
                    //親ノードが持つ子ノードのキーの配列
                    let parentChildKeys = Object.keys(parentNode[parentKeys[i]].data.ChildNode.node);
                    //console.log(parentChildKeys);
                    //削除するノードの親ノードの子ノードに登録されている自分のノードを削除する
                    for(var j = 0; j < parentChildKeys.length; j++){
                        //見つかったら削除
                        if(parentNode[parentKeys[i]].data.ChildNode.node[parentChildKeys[j]].data.TaskNode.id == parentKey){
                            //console.log("見つかった！ノードキー：" + parentChildKeys[j]);
                            //親ノードに登録されている子ノードを削除。
                            delete parentNode[parentKeys[i]].data.ChildNode.node[parentChildKeys[j]];
                            //削除対象につながっているline2も同様に削除。線は消さなくていい
                            delete parentNode[parentKeys[i]].data.TaskNode.line2[parentChildKeys[j]];

                            //削除は１つだけなのでループを１段階出る
                            break;
                        }                    
                    }
                }

            }
        },
        //削除するノードの子ノードから伸びているline1を一度すべて削除し、新しい親ノードへ線をつなげるための処理
        childInfFix:function(childNode, parentNode, parentKey){
            //削除するノードの子ノード情報の修正処理
            //削除するノードに子ノードがいる場合
            if(Object.keys(childNode).length != 0){
                let childKeys = Object.keys(childNode);
                let parentKeys = Object.keys(parentNode);
                let parentIds = "";
                //親ノードたちを決定する。保存形式は「1,2,3,4,5」のような形
                for(let i = 0; i < parentKeys.length; i++){
                    var key = parentKeys[i];
                    if(i == parentKeys.length - 1){
                        parentIds += key;
                    }
                    else{
                        parentIds += key + ",";
                    }
                }
                console.log("子ノード：" + childKeys);
                console.log("親ノード：" + parentKeys);
                //削除するノードの子ノードの親ノードに登録されている自分のノードを削除する
                //新たな親ノードとなるものが存在しないなら親ノードの設定を-1としてDBに更新
                if(parentKeys.length == 0 || parentKeys[0] == "-1"){
                    for(let j = 0; j < childKeys.length; j++){
                        //削除するノードの情報を消す
                        delete childNode[childKeys[j]].data.ParentNode.node[parentKey];
                        //-1をキーとして空のノードを登録しておく
                        childNode[childKeys[j]].data.ParentNode.node["-1"] = null;
                        //線の名前を変更
                        childNode[childKeys[j]].data.TaskNode.line1[parentKey].setAttribute("id", "line1_" + childKeys[j] + "_-1");
                        //-1をキーとして再登録
                        childNode[childKeys[j]].data.TaskNode.line1["-1"] = childNode[childKeys[j]].data.TaskNode.line1[parentKey];
                        childNode[childKeys[j]].data.TaskNode.line1["-1"].setAttribute("x1", childNode[childKeys[j]].data.TaskNode.x);
                        childNode[childKeys[j]].data.TaskNode.line1["-1"].setAttribute("y1", childNode[childKeys[j]].data.TaskNode.y);
                        childNode[childKeys[j]].data.TaskNode.line1["-1"].setAttribute("x2", 0);
                        childNode[childKeys[j]].data.TaskNode.line1["-1"].setAttribute("y2", 0);
                        //ParentNodeのx, yを原点へ変更する
                        childNode[childKeys[j]].data.ParentNode.x = 0;
                        childNode[childKeys[j]].data.ParentNode.y = 0;
                        //前の情報を削除。線は消さない
                        delete childNode[childKeys[j]].data.TaskNode.line1[parentKey];

                        axios.post("/TaskEdit/findOne",{
                            id: childNode[childKeys[j]].data.TaskNode.id
                        }).then(
                            (res)=>{
                                let childParentIds = res.data.parentId.split(',');  //[] or [1] or [1, 2, 3]のような形
                                let newParentIds = "-1";
                                for(let i = 0; i < childParentIds.length; i++){
                                    //変更前の情報も入っているのでそれだけ除外
                                    if(childParentIds[i] != parentKey){
                                        newParentIds += "," + childParentIds[i];
                                    }
                                }
                                axios.post("/TaskEdit/update", {
                                    id: res.data.id,
                                    title: res.data.title,
                                    contents:res.data.contents,
                                    deadline:res.data.deadline,
                                    complete:res.data.complelte,
                                    parentId: newParentIds,
                                    childId:res.data.childId,
                                    userId: res.data.userId
                                }).then(()=>{})
                                .catch(()=>{});
                            }
                        ).catch(()=>{});

                    }
                    return;
                }
                else{
                    for(let j = 0; j < childKeys.length; j++){
                        //残ったchildNode[childKeys[j]]から削除対象line1[parentKey]は一旦削除して、新たに、parentNode[parentKeys[i]]への線を作る
                        childNode[childKeys[j]].data.TaskNode.line1[parentKey].remove();
                        delete childNode[childKeys[j]].data.TaskNode.line1[parentKey];
                        //let line1Element = document.getElementById("line1_" + childKeys[j] + "_" + parentKey);
                        //line1Element.remove();

                        //子ノードの新たな親ノードの登録を行う
                        axios.post("/TaskEdit/findOne",{
                            id: childNode[childKeys[j]].data.TaskNode.id
                        }).then(
                            (res)=>{
                                axios.post("/TaskEdit/update", {
                                    id: res.data.id,
                                    title: res.data.title,
                                    contents:res.data.contents,
                                    deadline:res.data.deadline,
                                    complete:res.data.complelte,
                                    parentId: parentIds,
                                    childId:res.data.childId,
                                    userId: res.data.userId
                                }).then(()=>{})
                                .catch(()=>{});
                            }
                        ).catch(()=>{});

                        for(let i = 0; i < parentKeys.length; i++){
                            //もしルートノードを消したなら
                                //新たに線を再描画。ただし、その子ノードが２つ以上の親ノードを持っている場合は、余計に線を描画してしまうため、それを以下を使って回避する
                                if(document.getElementById("line1_" + childKeys[j] + "_" + parentKeys[i]) == null){
                                    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                                    line1.setAttribute("id", "line1_" + childKeys[j] + "_" + parentKeys[i]);
                                    line1.setAttribute("x1", childNode[childKeys[j]].data.TaskNode.x);
                                    line1.setAttribute("y1", childNode[childKeys[j]].data.TaskNode.y);
                                    line1.setAttribute("x2", parentNode[parentKeys[i]].data.TaskNode.x);
                                    line1.setAttribute("y2", parentNode[parentKeys[i]].data.TaskNode.y);
                                    line1.setAttribute('stroke', '#008080');
                                    line1.setAttribute('stroke-width', 5);
                                    document.getElementById("canvas").appendChild(line1);

                            if(parentNode[parentKeys[i]] == null){
                                console.log("親ノードは存在しないよ");
                                //親ノードと、親ノードに向かう線をnullに
                                delete childNode[childKeys[j]].data.ParentNode.node[parentKey];
                                childNode[childKeys[j]].data.ParentNode.x = 0;
                                childNode[childKeys[j]].data.ParentNode.y = 0;
                            }
                            else{
                                    //親ノードに新しく子ノードを追加
                                    parentNode[parentKeys[i]].data.ChildNode.node[childKeys[j]] = childNode[childKeys[j]];
                                    //親ノードに親から子への線の情報を紐づける
                                    parentNode[parentKeys[i]].data.TaskNode.line2[childKeys[j]] = line1;

                                    //子供たちを、削除するノードの親ノードにつなげる
                                    childNode[childKeys[j]].data.ParentNode.node[parentKeys[i]] = parentNode[parentKeys[i]];
                                    //childNodeのParentNodeの座標の参照先をparentNodeにしておく処理を追記

                                    //線も同様に削除するノードの親ノードのキーにつなげる。親ノード側も子ノードの参照先を追加
                                    //childNode[childKeys[j]].data.ParentNode.node.data.TaskNode.line2[childKeys[j]] = childNode[childKeys[j]].data.TaskNode.line1;
                                    childNode[childKeys[j]].data.TaskNode.line1[parentKeys[i]] = parentNode[parentKeys[i]].data.TaskNode.line2[childKeys[j]];
                                }

                            }
                        }
                    }
                }                
            }
        },
        changeParent:function(childId, parentId){
            if(Object.keys(this.nodes).length >= 2){
                //[1,2,3,4,5]など親ノードの配列
                var parentIds = parentId.split(',');
                //親ノードと子ノードのインスタンスをお互いに設定する
                var child = this.nodes[childId];   //追加処理中のノードのこと
                //複数の親ノードについて
                for(let i = 0; i < parentIds.length; i++){
                    var parent = this.nodes[parentIds[i]];
                    child.data.ParentNode.node[parentIds[i]] = parent;
                    if(parent != null){
                        //親側からみた子ノードは複数ある可能性がある
                        //辞書登録
                        parent.data.ChildNode.node[child.data.TaskNode.id] = child;
                    }
                    //子ノードへの線と親ノードへの線を設定する
                    if(child.data.ParentNode.node[parentIds[i]] != null){
                        child.data.ParentNode.node[parentIds[i]].data.TaskNode.line2[child.data.TaskNode.id] = child.data.TaskNode.line1[parentIds[i]];
                        child.data.TaskNode.line1[parentIds[i]] = child.data.ParentNode.node[parentIds[i]].data.TaskNode.line2[child.data.TaskNode.id];
                    }
                }
            }
        },
        changeLine:function(currentNode, beforeParentIds, parentIds){
            //一度前の親ノード情報と線をすべて消す
            for(let i = 0; i < beforeParentIds.length; i++){
                if(currentNode.data.ParentNode.node[beforeParentIds[i]] != null){
                    //前の親ノードに登録されている子ノード情報と線を削除
                    delete currentNode.data.ParentNode.node[beforeParentIds[i]].data.ChildNode.node[this.resDatas.id];
                    currentNode.data.ParentNode.node[beforeParentIds[i]].data.TaskNode.line2[this.resDatas.id].remove();
                    delete currentNode.data.ParentNode.node[beforeParentIds[i]].data.TaskNode.line2[this.resDatas.id];

                    //自身の親ノードに登録されている前の親ノード情報と線を削除
                    delete currentNode.data.ParentNode.node[beforeParentIds[i]];
                    currentNode.data.TaskNode.line1[beforeParentIds[i]].remove();
                    delete currentNode.data.TaskNode.line1[beforeParentIds[i]];
                }
                //原点への線がある場合
                else {
                    //キーが-1とは限らないため
                    let rootLineKey = Object.keys(currentNode.data.TaskNode.line1)[0];
                    currentNode.data.TaskNode.line1[rootLineKey].remove();
                    delete currentNode.data.ParentNode.node[rootLineKey];
                    //ここParentNodeの削除処理がいるのでは？
                    delete currentNode.data.TaskNode.line1[rootLineKey];
                }
            }
            let parentIdsString = "";
            //親ノードたちを決定する。保存形式は「1,2,3,4,5」のような形
            for(let i = 0; i < parentIds.length; i++){
                var key = parentIds[i];
                if(i == parentIds.length - 1){
                    parentIdsString += key;
                }
                else{
                    parentIdsString += key + ",";
                }
            }
            //新たな親ノードへの参照先の情報をDBに登録
            axios.post("/TaskEdit/findOne",{
                id: currentNode.data.TaskNode.id
            }).then(
                (res)=>{
                    axios.post("/TaskEdit/update", {
                        id: res.data.id,
                        title: res.data.title,
                        contents:res.data.contents,
                        deadline:res.data.deadline,
                        complete:res.data.complelte,
                        parentId: parentIdsString,
                        childId:res.data.childId,
                        userId: res.data.userId
                    }).then(()=>{})
                    .catch(()=>{});
                }
            ).catch(()=>{});

            //新たなノードの参照先を追加
            for(let i = 0; i < parentIds.length; i++){
                //新たな親は既存のどれか
                let currentKey = currentNode.data.TaskNode.id;
                let parentKey = parentIds[i];  //-1になることもある。
                let parent = this.nodes[parentKey];  //-1の時はnullが入る
                if(parent != null){
                    currentNode.data.ParentNode.node[parentKey] = parent;
                    parent.data.ChildNode.node[currentKey] = currentNode;                
                }
                //新たな親ノードへの線を描画
                let line1 = document.getElementById("line1_" + currentKey + "_" + parentKey);
                if(line1 == null){
                    line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line1.setAttribute("id", "line1_" + currentKey + "_" + parentKey);
                    line1.setAttribute("x1", currentNode.data.TaskNode.x);
                    line1.setAttribute("y1", currentNode.data.TaskNode.y);
                    if(parent != null){
                        line1.setAttribute("x2", parent.data.TaskNode.x);
                        line1.setAttribute("y2", parent.data.TaskNode.y);
                    }
                    else{
                        //親ノードがいないなら原点へ
                        line1.setAttribute("x2", 0);
                        line1.setAttribute("y2", 0);
                    }
                    line1.setAttribute('stroke', '#008080');
                    line1.setAttribute('stroke-width', 5);
                    document.getElementById("canvas").appendChild(line1);

                    if(parent != null){
                        //親ノードに新しく子ノードを追加
                        parent.data.ChildNode.node[currentKey] = currentNode;
                        //親ノードに親から子への線の情報を紐づける
                        parent.data.TaskNode.line2[currentKey] = line1;

                        //子供たちを、削除するノードの親ノードにつなげる
                        currentNode.data.ParentNode.node[parentKey] = parent;

                        //線も同様に削除するノードの親ノードのキーにつなげる。親ノード側も子ノードの参照先を追加
                        currentNode.data.TaskNode.line1[parentKey] = parent.data.TaskNode.line2[currentKey];
                    }
                    //親ノードが存在しないならline1のみ設定
                    else{
                        //線も同様に削除するノードの親ノードのキーにつなげる。親ノード側も子ノードの参照先を追加
                        currentNode.data.TaskNode.line1[parentKey] = line1;
                        //ParentNodeのx, yを原点へ変更する
                        currentNode.data.ParentNode.x = 0;
                        currentNode.data.ParentNode.y = 0;
                        line1.setAttribute("x1", currentNode.data.TaskNode.x);
                        line1.setAttribute("y1", currentNode.data.TaskNode.y);
                        line1.setAttribute("x2", 0);
                        line1.setAttribute("y2", 0);
                    }
                }
            }
        }
    }
}
</script>

<style src="../css/MindMapDraw.css"></style>
