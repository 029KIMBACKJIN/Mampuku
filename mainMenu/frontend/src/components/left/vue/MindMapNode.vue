<template>
    <button v-bind:id = "TaskNode.id"
        style="
        position: absolute;
        display: inline-block;
        width: 100px;  /*幅*/
        height: 100px;  /*高さ*/
        border-radius: 50%;  /*角の丸み*/
        text-align:center;
        line-height: 80px;
        "
        v-bind:style="{
            transform: `translate(${TaskNode.x - TaskNode.drawWidth}px, ${TaskNode.y - TaskNode.drawHeight}px) scale(${TaskNode.scX}, ${TaskNode.scY})`,
            backgroundColor: TaskNode.color
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
//import axios from 'axios';
const interval = require('../../../originModules/calcDayMethods');

export default{
    name: "MindMapNode",
    props: {
    },
    data: () => ({
        windowWidth:window.outerWidth,
        beforeOffsetX:0,
        beforeOffsetY:0,
        ParentNode:{
            node:null,
            x:0,
            y:0
        },
        TaskNode:{
            id:"circle",
            scX:2,
            scY:2,
            maxScX:4,
            maxScY:4,
            x:100,
            y:600,
            drawWidth:600,
            drawHeight:100,
            color:"#FFFFFF",
            taskName:"タスク名",        
            clicking:false,
            line1:null,   //親ノードへの線
            line2:{},    //子ノードへの線
            currentDate:null,  //現在時刻
            intervalId:null,
            deadline:null   //締め切り日

        },
        ChildNode:{
            node:{},
            x:100,
            y:0
        },
    }),
    components: {
    },
    mounted(){
        //1秒単位で現在時刻を更新する。
        this.TaskNode.intervalId = setInterval(this.getCurrentDate, 1000);
        window.addEventListener("resize", this.resizeWindow);
        this.beforeOffsetX = this.TaskNode.x;
        this.beforeOffsetY = this.TaskNode.y;
    },
    //終了直前に呼ばれるメソッド？
    beforeUnmount(){
    },
    watch:{
    },
    methods:{
        resizeWindow:function(){
            var element = document.getElementById(this.TaskNode.id);
            console.log("window:" + this.windowWidth, window.innerWidth, window.outerWidth);
            console.log("rect:" + element.clientLeft, element.clientTop);
            /*
            if(this.TaskNode.line1 != null){
                this.TaskNode.line1.setAttribute("x2", element.clientLeft);
            }
            for(let i = 0; i < Object.keys(this.TaskNode.line2).length; i++){
                //
            }
            */
            //let x = this.TaskNode.x;
            //let y = this.TaskNode.y;
            //this.TaskNode.x = element.offsetLeft + (this.windowWidth - window.outerWidth);
            //this.TaskNode.x = element.clientLeft;
            //this.TaskNode.x = x;
            //this.TaskNode.y = y;
            /*
            if(this.TaskNode.x != this.beforeTaskX){
                this.TaskNode.x = this.beforeTaskX;
            }
            if(this.TaskNode.y != this.beforeTaskY){
                this.TaskNode.y = this.beforeTaskY;
            }
            */
            console.log("Node:" + this.TaskNode.taskName + ", " + this.TaskNode.x, this.TaskNode.y);
            console.log(element.offsetLeft, element.offsetTop);
        },
        mouseDoubleClick: function(){
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
                var element = document.getElementById(this.TaskNode.id);
                this.beforeOffsetX = this.TaskNode.x;
                this.beforeOffsetY = this.TaskNode.y;
                console.log(this.TaskNode.x, element.offsetLeft, this.TaskNode.y, element.offsetTop);
                this.setPos();
            }
        },
        mouseLeave:function(){
            this.TaskNode.clicking = false;
            //this.TaskNode.taskName = "離した";
        },
        setPos:function(){
            if(this.ParentNode.node != null){
                //現在ノードが親ノードの位置を記憶
                this.ParentNode.x =  this.ParentNode.node.data.TaskNode.x;
                this.ParentNode.y =  this.ParentNode.node.data.TaskNode.y;
                //親ノードが子ノードの位置を記憶
                this.ParentNode.node.data.ChildNode.x = this.TaskNode.x;
                this.ParentNode.node.data.ChildNode.y = this.TaskNode.y;
            }
            var childKeys = Object.keys(this.ChildNode.node);
            if(this.ChildNode.node.length != 0){
                //現在ノードが子ノードの位置を記憶
               //varは関数スコープで、letがブロックスコープらしい。
                //子ノードが親ノードの位置を記憶
                for(var i = 0; i < childKeys.length; i++){
                    this.ChildNode.node[childKeys[i]].data.ParentNode.x = this.TaskNode.x;
                    this.ChildNode.node[childKeys[i]].data.ParentNode.y = this.TaskNode.y;
                }

            }
            //親コンポーネントにデータを送る
            //this.$emit("position",[this.TaskNode.x, this.TaskNode.y]);
            //子(多)から親(1)への線
            if(this.TaskNode.line1 != null){
                this.TaskNode.line1.setAttribute("x1", this.TaskNode.x);
                this.TaskNode.line1.setAttribute("y1", this.TaskNode.y);
                if(this.ParentNode.node != null){
                    this.TaskNode.line1.setAttribute("x2", this.ParentNode.node.data.TaskNode.x);
                    this.TaskNode.line1.setAttribute("y2", this.ParentNode.node.data.TaskNode.y);
                }
                else{
                    this.TaskNode.line1.setAttribute("x2", this.ParentNode.x);
                    this.TaskNode.line1.setAttribute("y2", this.ParentNode.y);
                }
            }
            //親(1)から子(多)への線
            if(this.TaskNode.line2.length != 0){
                //for(i = 0; i < this.TaskNode.line2.length; i++){
                for(i = 0; i <  childKeys.length; i++){
                    if(this.TaskNode.line2[childKeys[i]] != null){
                        this.TaskNode.line2[childKeys[i]].setAttribute("x1", this.TaskNode.x);
                        this.TaskNode.line2[childKeys[i]].setAttribute("y1", this.TaskNode.y);                
                        this.TaskNode.line2[childKeys[i]].setAttribute("x2", this.ChildNode.node[childKeys[i]].data.TaskNode.x);
                        this.TaskNode.line2[childKeys[i]].setAttribute("y2", this.ChildNode.node[childKeys[i]].data.TaskNode.y);
                    }
                    if(this.ChildNode.node[childKeys[i]].data.TaskNode.line1 != null){
                        this.ChildNode.node[childKeys[i]].data.TaskNode.line1.setAttribute("x1", this.ChildNode.node[childKeys[i]].data.TaskNode.x);
                        this.ChildNode.node[childKeys[i]].data.TaskNode.line1.setAttribute("y1", this.ChildNode.node[childKeys[i]].data.TaskNode.y);
                        this.ChildNode.node[childKeys[i]].data.TaskNode.line1.setAttribute("x2", this.TaskNode.x);
                        this.ChildNode.node[childKeys[i]].data.TaskNode.line1.setAttribute("y2", this.TaskNode.y);
                    }
                }
            }
        },
        getCurrentDate:function(){
            //Tue May 30 2023 09:47:24 GMT+0900のように取得される
            //この条件分岐はデバッグ用。日数経過とともに移動するかを試した
            if(this.TaskNode.currentDate != null){
                this.TaskNode.currentDate.setDate(this.TaskNode.currentDate.getDate() + 1);
            }
            else{
                this.TaskNode.currentDate = new Date();
            }
            if(this.TaskNode.deadline != null){
                //2023-05-30T00:00:00:000Zのように取られる
                var deadYmd = (this.TaskNode.deadline).split('T')[0].split('-');

                var currentY = this.TaskNode.currentDate.getFullYear();
                var currentM = this.TaskNode.currentDate.getMonth() + 1;
                var currentD = this.TaskNode.currentDate.getDate();

                /*
                日数を計算する
                */
                var days = interval.getDays(currentY, currentM, currentD, parseInt(deadYmd[0]), parseInt(deadYmd[1]), parseInt(deadYmd[2]));

                //色を時間とともに変更（赤くなっていくようにした）
                //1文字ずつ分割して配列にする。最初の要素は「#」
                var rgb = (this.TaskNode.color).split('');
                var r = rgb[1] + rgb[2];  //FF
                var g = rgb[3] + rgb[4];  //FF
                var b = rgb[5] + rgb[6];  //FF
                //ここらへんの数値計算に誤りがあるらしいNANと表示されるから
                //計算した日数から位置やサイズを計算する
                //位置は初期位置からdays分割した値だけ上昇するように設定。横は設定しない
                //this.TaskNode.y -= this.TaskNode.y / days;
                //サイズを時間とともに変更(0で割ることを防止する)
                if(days > 0){
                    this.TaskNode.scX += (this.TaskNode.maxScX - this.TaskNode.scX) / days;
                    this.TaskNode.scY += (this.TaskNode.maxScY - this.TaskNode.scY) / days;
                    r = parseInt(r, 16);  //16進数文字列を10進数に変換
                    g = parseInt(g, 16);  //16進数文字列を10進数に変換
                    b = parseInt(b, 16);  //16進数文字列を10進数に変換
                    g -= parseInt(g / days);
                    b -= parseInt(b / days);
                    if(r < 10){
                        r = "0" + r.toString(16);  //16進数文字列を10進数に変換
                    }
                    else{
                        r = r.toString(16);  //16進数文字列を10進数に変換
                    }
                    if(g < 10){
                        g = "0" + g.toString(16);  //16進数文字列を10進数に変換
                    }
                    else{
                        g = g.toString(16);  //16進数文字列を10進数に変換
                    }
                    if(b < 10){
                        b = "0" + b.toString(16);  //16進数文字列を10進数に変換
                    }
                    else{
                        b = b.toString(16);  //16進数文字列を10進数に変換
                    }
                    this.TaskNode.color = rgb[0] + r + g + b;
                }

                this.setPos();
                //期限を過ぎたら
                if(days <= 0){
                    clearInterval(this.TaskNode.intervalId);
                    alert("タスク：「" + this.TaskNode.taskName + "」が期限になりました");
                }
            }
        }
    }
}
</script>
