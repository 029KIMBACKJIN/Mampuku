<template>
    <div class="MindMap">
        <div class="MindMapHelpButton">
            <button class="MindMapQuestionButton" @click="openModal">?</button>
        </div>
        <h1>マインドマップ</h1>
        <div class="MindMapDrawArea">
                <MindMapDraw :isTaskCreated="isTaskCreated" :resDatas="resDatas" v-on:isEditFlag="sendToEditFlag" v-on:resEditDatas="sendToEditDatas" :isTaskEdit="isTaskEdit" :isTaskDelete="isTaskDelete" />
        </div>

        <div class="modal-container" v-if="isModalOpen" @click="closeModal">
            <div class="modal-content">
                <p>{{ modalContent }}</p>
            </div>
        </div>
    </div>

    <!-- <div class = "MindMap">
        <h1>マインドマップ</h1>
        <div class = "MindMapDrawArea">
            <MindMapDraw :isTaskCreated="isTaskCreated" :resDatas="resDatas" v-on:isEditFlag="sendToEditFlag" v-on:resEditDatas = "sendToEditDatas" :isTaskEdit="isTaskEdit" :isTaskDelete="isTaskDelete"/>
        </div>
    </div> -->
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
        isModalOpen: false,
        modalContent: "登録したタスクが下の領域に表示されます。"
    }),
    components:{
        MindMapDraw
    },
    methods:{
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
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