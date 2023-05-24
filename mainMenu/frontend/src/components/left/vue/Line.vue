<template>
    <line v-bind:x1="x1" v-bind:y1="y1" v-bind:x2="x2" v-bind:y2="y2" stroke="black"></line>
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