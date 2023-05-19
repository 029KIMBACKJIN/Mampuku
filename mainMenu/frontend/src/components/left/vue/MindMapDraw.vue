<template>
    <!--translateでドラッグ移動、scaleでサイズ変更がパラメータでできる
        MindMapDraw内であればドラッグを有効にする。ドラッグ中に枠から出たら強制的にドラッグ解除
    -->
    <div class = "MindMapDraw" 
    v-on:mouseup="mouseClickUp($event)"
    v-on:mouseleave="mouseClickUp($event)"
    >
        <MindMapNode/>
    </div>
</template>

<script>
import MindMapNode from './MindMapNode.vue'

//タスクアイコンをクリックしたらmethodで呼び出す。
export default{
    name: "MindMapDraw",
    props: {},
    data: () => ({
    }),
    components: {
        MindMapNode
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
