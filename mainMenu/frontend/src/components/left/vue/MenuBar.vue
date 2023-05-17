<template>
    <div class = "menuBar">
        <h1>メニューバー</h1>
        <div class = "buttons">
            <div class ="b-btn-group">
                <div class = "button"><button class = "btn btn-success" style = "width:15%; height:3vw; max-width: 100%; max-height: 100vw; font-size: 150%;">使い方</button></div>
                <div class = "button"><button class = "btn btn-success" style = "width:15%; height:3vw; max-width: 100%;max-height: 100vw; font-size:100%" >クリティカルパス</button></div>
                <div class = "button"><button class = "btn btn-success" style = "width:15%; height:3vw;max-width: 100%; max-height: 100vw; font-size: 150%;">その他</button></div>
            </div>
        </div>
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
<!--このコンポーネントで使いたいcssファイルはここで指定する-->
<style src = "../css/MenuBar.css"></style>
