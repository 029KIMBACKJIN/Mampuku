<template>
    <div class = "MindMap">
        <h1>マインドマップ</h1>
        <div class = "MindMapDrawArea">
            <MindMapDraw :isTaskCreated="isTaskCreated" :resDatas="resDatas"/>
        </div>
    </div>
</template>


<script>
import MindMapDraw from './MindMapDraw.vue'

export default{
    name:"MindMap",
    props:{
        isTaskCreated:Boolean,
        resDatas:Object
    },
    data:()=>({

    }),
    components:{
        MindMapDraw
    }
}
</script>

<style src ="../css/MindMap.css"></style>