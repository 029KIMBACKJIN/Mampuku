<template>
    <div class = "MindMap">
        <h1>マインドマップ(ダブルクリックで生成(仮))</h1>
        <div class = "MindMapDrawArea">
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