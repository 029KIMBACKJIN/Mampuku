<template>
    <button id = "circle"
        style="position: absolute;"
        v-bind:style="{
            transform: `translate(${TaskNode.x}px, ${TaskNode.y - TaskNode.drawHeight}px) scale(${TaskNode.scX}, ${TaskNode.scY})`
        }"    
        v-on:dblclick="mouseDoubleClick"
        v-on:mousedown="mouseClickDown"
        v-on:mouseup="mouseClickUp($event)"
        v-on:mousemove="mouseDragging($event)"
        v-on:mouseleave="mouseLeave"
        >
        {{ TaskNode.taskName }}
    </button>
</template>

<script>
import axios from 'axios';

export default{
    name: "MindMapNode",
    props: {},
    data: () => ({
        ParentNode:{
            node:null,
            x:0,
            y:0
        },
        TaskNode:{
            id:"circle",
            scX:2,
            scY:2,
            x:100,
            y:100,
            drawWidth:100,
            drawHeight:100,
            taskName:"タスク名",        
            clicking:false,
            line1:null,   //親ノードへの線
            line2:null    //子ノードへの線
        },
        ChildNode:{
            node:null,
            x:100,
            y:0
        }
    }),
    components: {
    },
    methods:{
        mouseDoubleClick: function(){
            //this.TaskNode.taskName = "ノードでダブルクリックした";
            //データを送りたいときはpost titleを送る
            //params引数はreq.params.で取れる
            axios.post("/MindMap/doubleClick", {
                id: this.TaskNode.id,
                title: this.TaskNode.taskName
            })
            .then((res) => {
                alert(res.data.title);
            })
            .catch((e)=>{
                alert(e);
            })

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
            */
        },
        mouseClickUp:function(){
            //this.TaskNode.taskName = "離した";
            this.TaskNode.clicking = false;
        },
        mouseClickDown:function(){
            //this.TaskNode.taskName = "押した";
            this.TaskNode.clicking = true;
        },
        mouseDragging:function(e){
            if(this.TaskNode.clicking){
                //this.TaskNode.taskName = "(X:" + e.movementX + ", Y:" + e.movementY + ")";
                //マウスの移動量で計算
                this.TaskNode.x += e.movementX;
                this.TaskNode.y += e.movementY;

                if(this.ParentNode.node != null){
                    this.ParentNode.x =  this.ParentNode.node.data.TaskNode.x;
                    this.ParentNode.y =  this.ParentNode.node.data.TaskNode.y;
                    this.ParentNode.node.data.ChildNode.x = this.TaskNode.x;
                    this.ParentNode.node.data.ChildNode.y = this.TaskNode.y;
                }
                if(this.ChildNode.node != null){
                    this.ChildNode.x =  this.ChildNode.node.data.TaskNode.x;
                    this.ChildNode.y =  this.ChildNode.node.data.TaskNode.y;
                    this.ChildNode.node.data.ParentNode.x = this.TaskNode.x;
                    this.ChildNode.node.data.ParentNode.y = this.TaskNode.y;
                }
                //親コンポーネントにデータを送る
                //this.$emit("position",[this.TaskNode.x, this.TaskNode.y]);
                if(this.TaskNode.line1 != null){
                    this.TaskNode.line1.setAttribute("x1", this.TaskNode.x);
                    this.TaskNode.line1.setAttribute("y1", this.TaskNode.y);
                    this.TaskNode.line1.setAttribute("x2", this.ParentNode.x);
                    this.TaskNode.line1.setAttribute("y2", this.ParentNode.y);
                    /*
                    if(this.ParentNode.node.TaskNode.line2 != null){
                        this.ParentNode.node.TaskNode.line2.setAttribute("x1", this.ParentNode.node.TaskNode.x);
                        this.ParentNode.node.TaskNode.line2.setAttribute("y1", this.ParentNode.node.TaskNode.y);
                    }
                    */
                }
                if(this.TaskNode.line2 != null){
                    this.TaskNode.line2.setAttribute("x1", this.TaskNode.x);
                    this.TaskNode.line2.setAttribute("y1", this.TaskNode.y);
                    this.TaskNode.line2.setAttribute("x2", this.ChildNode.x);
                    this.TaskNode.line2.setAttribute("y2", this.ChildNode.y);
                }
                console.log("parent(x:" + this.ParentNode.x + ", y:" + this.ParentNode.y + ")");
                console.log("TaskNode(x:" + this.TaskNode.x + ", y:" + this.TaskNode.y + ")");
                console.log("child(x:" + this.ChildNode.x + ", y:" + this.ChildNode.y + ")");
            }
        },
        mouseLeave:function(){
            this.TaskNode.clicking = false;
            //this.TaskNode.taskName = "離した";
        },
        getTaskName:function(){
            return this.TaskNode.taskName;
        }
    }
}
</script>
<style src="../css/MindMapNode.css"></style>
