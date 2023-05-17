<template>
    <div class = "MindMap">
        <h1>マインドマップ</h1>
        <div class = "MindMapDraw">
            <MindMapDraw/>
        </div>
    </div>
</template>


<script>
import MindMapDraw from './MindMapDraw.vue'

export default{
    name:"MindMap",
    props:{

    },
    data:()=>({

    }),
    components:{
        MindMapDraw
    }
}
</script>

<style src ="../css/MindMap.css"></style>