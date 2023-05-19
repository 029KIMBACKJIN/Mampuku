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
        <svg viewbox="0 0 300 300" width="300" height="300">
            <line x1=100 y1=100 x2=200 y2=200 stroke="black"></line>
        </svg>
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
    props: {},
    data: () => ({
        isCreateNode:false,
    }),
    components: {
        MindMapNode
    },
    methods:{
        mouseDoubleClick: function(){
            //コンポーネントを生成する
            const Component = createApp(MindMapNode);
            //divというタグの要素を生成する
            const wrapper = document.createElement("div");
            //wrapperのタグ内に生成したコンポーネントを入れる。
            Component.mount(wrapper);
            //MindMapDrawというidを持つ要素の中に入れる
            document.getElementById("MindMapDraw").appendChild(wrapper);
        },
        mouseClickUp:function(){
        }
    }
}
</script>

<style src="../css/MindMapDraw.css"></style>
