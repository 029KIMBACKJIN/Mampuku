<template>
    <svg viewbox="-300 -300 300 300" width="300" height="300">
        <line v-bind:x1="x1" v-bind:y1="y1" v-bind:x2="x2" v-bind:y2="y2" stroke="black"></line>
    </svg>    
</template>
<script>

export default{
    name:"NodeLine",
    props:{
        x1:Number,
        y1:Number,
        x2:Number,
        y2:Number
    },
    data:()=>({

    })
}
</script>