<template>
    <!--translateでドラッグ移動、scaleでサイズ変更がパラメータでできる
        MindMapDraw内であればドラッグを有効にする。ドラッグ中に枠から出たら強制的にドラッグ解除
    -->
    <div class = "MindMapDraw" 
    v-on:mousemove="mouseDragging($event)"
    v-on:mouseleave="mouseClickUp($event)"
    v-on:mouseup="mouseClickUp($event)"
    >
        <!--タスクをダブルクリックしたときの処理ができるようにした-->
        <button id = "circle" 
            v-bind:style="{
                transform: `translate(${x}px, ${y}px) scale(${scX}, ${scY})`
            }"    
            v-on:dblclick="mouseDoubleClick"
            v-on:mousedown="mouseClickDown"
            v-on:mouseup="mouseClickUp($event)">

            {{ taskName }}
        </button>
    </div>
</template>

<script>


//タスクアイコンをクリックしたらmethodで呼び出す。
export default{
    name: "MindMapDraw",
    props: {},
    data: () => ({
        nodeNumber:0,
        scX:2,
        scY:2,
        x:100,
        y:100,
        width:100,
        height:100,
        taskName:"タスク名",
        clicking:false,
    }),
    components: {

    },
    methods:{
        mouseDoubleClick: function(){
            this.taskName = "ダブルクリックした";
            //要素を複製する処理(idを引数に入れる)
            let circle = document.getElementById("circle");
            //子要素も含めて複製する。
            let clone_circle = circle.cloneNode(true);

            //内容を編集したい場合は追記

            //htmlに挿入
            circle.after(clone_circle);
        },
        mouseClickUp:function(){
            this.taskName = "離した";
            this.clicking = false;
        },
        mouseClickDown:function(){
            this.taskName = "押した";
            this.clicking = true;
        },
        mouseDragging:function(e){
            if(this.clicking){
                this.taskName = "(X:" + e.offsetX + ", Y:" + e.offsetY + ")";
                this.x = e.offsetX - this.width / 2;
                this.y = e.offsetY - this.height / 2;
            }
        }
    }
}
</script>

<style src="../css/MindMapDraw.css"></style>
