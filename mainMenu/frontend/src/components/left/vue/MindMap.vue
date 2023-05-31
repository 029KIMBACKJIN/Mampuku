<template>
    <div class = "MindMap">
        <h1>マインドマップ</h1>
        <div class = "MindMapDrawArea">
            <MindMapDraw :isTaskCreated="isTaskCreated" :resDatas="resDatas" v-on:isEditFlag="sendToEditFlag" v-on:resEditDatas = "sendToEditDatas" :isTaskEdit="isTaskEdit" :isTaskDelete="isTaskDelete"/>
        </div>
    </div>
</template>


<script>
import MindMapDraw from './MindMapDraw.vue'

export default{
    name:"MindMap",
    props:{
        isTaskCreated:Boolean,
        isTaskEdit:Boolean,
        isTaskDelete:Boolean,
        resDatas:Object
    },
    data:()=>({

    }),
    components:{
        MindMapDraw
    },
    methods:{
        sendToEditFlag:function(event){
            this.$emit("isEditFlag", event);
        },
        sendToEditDatas:function(event){
            this.$emit("resEditDatas", event);
        }
    }
}
</script>

<style src ="../css/MindMap.css"></style>