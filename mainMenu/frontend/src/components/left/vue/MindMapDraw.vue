<template>
    <!--translateでドラッグ移動、scaleでサイズ変更がパラメータでできる
        MindMapDraw内であればドラッグを有効にする。ドラッグ中に枠から出たら強制的にドラッグ解除
    -->
    <div id = "MindMapDraw" 
    v-on:dblclick="mouseDoubleClick($event)"
    >
        <!--このノードは見えなくする-->
        <div v-show="false">
            <MindMapNode/>
        </div>
    </div>
</template>

<script>
import MindMapNode from './MindMapNode.vue';
import { createApp } from "vue"
//ここにタスク追加画面用のvueファイルをインポートしてパラメータを貰う。
//そのパラメータの状態によってv-ifでイベントを発火させる。

//タスクアイコンをクリックしたらmethodで呼び出す。
//isCreateNode=作られたタスクがあるかどうか。外部から作られたかどうかの状態を取得して
//v-if:isCreateNodeで発火する。
export default{
    name: "MindMapDraw",
    props: {
        isTaskCreated:Boolean
    },
    data: () => ({
        isCreateNode:false,
        nodes:[]
    }),
    components: {
        MindMapNode
    },
    watch:{
        isTaskCreated:function(){
            console.log("タスクが作成されました！！！");

            //コンポーネントを生成する
            const Component = createApp(MindMapNode);
            //divというタグの要素を生成する
            const wrapper = document.createElement("div");
            //wrapperのタグ内に生成したコンポーネントを入れる。
            Component.mount(wrapper);

            //データベースから親ノードのidと、タスク名をタスク作成画面の命令から取り出して、idとnodesの添え字が一致するものを探す
            //var ParentComponent = ;
            //タスク作成画面から得た情報から、タスク名を取り出す
            //var taskName = ;

            //データベースに登録されているタスクのid, 名前を代入する。
            /*
            Component._instance.data.TaskNode.taskName = taskName;
            Component._instance.data.TaskNode.id = nodes.length;
            ParentComponent.id = nodes.length;
            Component._instance.data.ParentNode.id = ParentComponent.id;
            */

            //データベースに親ノードの子ノード情報を更新する。
            
            this.nodes.push(Component._instance);

            if(this.nodes.length >= 2){
                this.nodes[1].data.ParentNode.node = this.nodes[0];
                this.nodes[0].data.ChildNode.node = this.nodes[1];
                console.log("親ノードと子ノードの情報取得（仮）");
            }

            console.log("登録されているノード一覧\n\n" + this.nodes);
            //MindMapDrawというidを持つ要素の中に入れる
            document.getElementById("MindMapDraw").appendChild(wrapper);

        }
    },
    methods:{
        mouseDoubleClick: function(){
        },
        mouseClickUp:function(){
        }
    }
}
</script>

<style src="../css/MindMapDraw.css"></style>
