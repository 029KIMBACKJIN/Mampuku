<template>
    <div class = "menuBar">
        <h1>メニューバー</h1>
    </div>
</template>

<script>

export default {
    name: "MenuBar",
    props:{
        isHowToButton: Boolean,
        isCriticalButton: Boolean
    },
    data:()=>({
        isBool:false
    })
}
</script>