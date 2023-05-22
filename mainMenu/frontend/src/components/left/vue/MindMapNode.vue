<template>
    <ParentLine  v-bind:x1="ParentNode.x" v-bind:y1="ParentNode.y" v-bind:x2="TaskNode.x" v-bind:y2="TaskNode.y"/>
    <button id = "circle" 
        v-bind:style="{
            transform: `translate(${TaskNode.x}px, ${TaskNode.y}px) scale(${TaskNode.scX}, ${TaskNode.scY})`
        }"    
        v-on:dblclick="mouseDoubleClick"
        v-on:mousedown="mouseClickDown"
        v-on:mouseup="mouseClickUp($event)"
        v-on:mousemove="mouseDragging($event)"
        v-on:mouseleave="mouseLeave"
        >
        {{ TaskNode.taskName }}
    </button>
    <ChildLine v-bind:x1="TaskNode.x" v-bind:y1="TaskNode.y" v-bind:x2="ChildNode.x" v-bind:y2="ChildNode.y"/>
</template>

<script>
import ParentLine from './Line.vue';
import ChildLine from './Line.vue';

export default{
    name: "MindMapNode",
    props: {},
    data: () => ({
        ParentNode:{
            id:-1,
            x:0,
            y:0
        },
        TaskNode:{
            id:"circle",
            scX:2,
            scY:2,
            x:100,
            y:100,
            width:100,
            height:100,
            taskName:"タスク名",        
            clicking:false
        },
        ChildNode:{
            id:-1,
            x:100,
            y:0
        }
    }),
    components: {
        ParentLine,
        ChildLine
    },
    methods:{
        mouseDoubleClick: function(){
            this.TaskNode.taskName = "ノードでダブルクリックした";
            /*
            this.TaskNode.taskName = "ダブルクリックした";
            //要素を複製する処理(idを引数に入れる)
            let circle = document.getElementById("circle");
            //子要素も含めて複製する。
            let clone_circle = circle.cloneNode(true);

            //内容を編集したい場合は追記 TaskNodeオブジェクトを複製したい
            //id名の変更と、buttonタグにあるidも動的に変えてしまえば動くのでは？？？

            //htmlに挿入
            circle.after(clone_circle);
            axios.get("/MindMap/doubleClick")
            .then((res) => {
                alert(res.data);
            })
            .catch((e)=>{
                alert(e);
            })
            */
        },
        mouseClickUp:function(){
            this.TaskNode.taskName = "離した";
            this.TaskNode.clicking = false;
        },
        mouseClickDown:function(){
            this.TaskNode.taskName = "押した";
            this.TaskNode.clicking = true;
        },
        mouseDragging:function(e){
            if(this.TaskNode.clicking){
                this.TaskNode.taskName = "(X:" + e.movementX + ", Y:" + e.movementY + ")";
                //マウスの移動量で計算
                this.TaskNode.x += e.movementX;
                this.TaskNode.y += e.movementY;
            }
        },
        mouseLeave:function(){
            this.TaskNode.clicking = false;
            this.TaskNode.taskName = "離した";
        },
        getTaskName:function(){
            return this.TaskNode.taskName;
        }
    }
}
</script>
<style src="../css/MindMapNode.css"></style>
