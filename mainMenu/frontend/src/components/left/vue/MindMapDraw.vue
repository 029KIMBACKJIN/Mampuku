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
import TaskEdit from '../../right/vue/TaskEdit.vue';
import axios from 'axios';
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
        resDatas:Object,
        width:{type:Number,default:10000},
        height:{type:Number,default:10000}
    },
    data: () => ({
        isCreateNode:false,
        isEditNode:false,
        nodes:[]
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

            //コンポーネントを生成する
            const Component = createApp(MindMapNode);
            //divというタグの要素を生成する
            const wrapper = document.createElement("div");
            wrapper.setAttribute("id", "node_" + this.nodes.length);
            //TaskEditのmouseDoubleClickメソッドを呼び出すようにする
            wrapper.setAttribute('v-on:dblclick', TaskEdit.methods.mouseDoubleClick);
            //setAttributeでv-onと書いてメソッド指定でも反応するらしい
            //wrapperのタグ内に生成したコンポーネントを入れる。
            Component.mount(wrapper);

            //データベースから親ノードのidと、タスク名をタスク作成画面の命令から取り出して、idとnodesの添え字が一致するものを探す
            //var ParentComponent = ;
            //タスク作成画面から得た情報から、タスク名を取り出す
            //var taskName = ;
            //データベースに登録されているタスクのid, 名前を代入する。
            Component._instance.data.TaskNode.id = this.resDatas.id;
            Component._instance.data.TaskNode.taskName = this.resDatas.title;
            Component._instance.data.ParentNode.id = this.resDatas.parentId;
            Component._instance.data.ChildNode.id = this.resDatas.childId;
            Component._instance.data.TaskNode.drawHeight = this.height;


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

            this.nodes.push(Component._instance);
            if(this.nodes.length >= 2){
                //親ノードと子ノードのインスタンスをお互いに設定する
                //[1].parentNode.node = [0]...
                this.nodes[this.nodes.length - 1].data.ParentNode.node = this.nodes[this.nodes.length - 2];
                //[0].childNode.node = [1]...
                this.nodes[this.nodes.length - 2].data.ChildNode.node = this.nodes[this.nodes.length - 1];
                //子ノードへの線を設定する
                Component._instance.data.ParentNode.node.data.TaskNode.line2 = line1;
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

            console.log("登録されているノード一覧\n\n" + this.nodes);
            //MindMapDrawというidを持つ要素の中に入れる


            document.getElementById("MindMapDraw").appendChild(wrapper);
        },
        isTaskEdit:function(){
            //ページのリロードするとデータが失われるので、その時はエラーする。
            this.nodes[this.resDatas.id - 1].data.TaskNode.taskName = this.resDatas.title;
            console.log(this.nodes[0].data);
        }
    },
    methods:{
        mouseDoubleClick: function(event){
            console.log("ダブルクリックした。データ：" + event.target.id);
            //MindMapNodeから以下をやろうとすると、TaskEditへデータを送れない。
            axios.post("/MindMap/doubleClick", {
                id: event.target.id
            })
            .then((res) => {
                alert(res.data.title);
                this.isEditNode = !this.isEditNode;
                this.$emit("isEditFlag", this.isEditNode);
                this.$emit("resEditDatas", res.data);
            })
            .catch((e)=>{
                alert(e);
            })

        },
        mouseClickUp:function(){
        },
        setLinePosition:function(event){
            console.log(event);
        }
    }
}
</script>

<style src="../css/MindMapDraw.css"></style>
