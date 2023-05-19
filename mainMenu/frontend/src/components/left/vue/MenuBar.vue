<template>
    <div class = "menuBar">
        <h1>メニューバー</h1>
        <div class = "buttons">
            <div class ="b-btn-group">
                <div class = "button"><button v-on:click="HowToButton" class = "btn btn-success" style = "width:15%; height:3vw; max-width: 100%; max-height: 100vw; font-size: 150%;">使い方</button></div>
                <div class = "button"><button v-on:click="CriticalButton" class = "btn btn-success" style = "width:15%; height:3vw; max-width: 100%;max-height: 100vw; font-size:100%" >クリティカルパス</button></div>
                <div class = "button"><button v-on:click="otherButton" class = "btn btn-success" style = "width:15%; height:3vw;max-width: 100%; max-height: 100vw; font-size: 150%;">その他</button></div>
            </div>
        </div>
        </div>
</template>

<script>
import axios from "axios";
//サーバとの通信を可能にするために必要
/*
axios.get(/...)  サーバにアクセスする
then((変数) => {処理}) 通信に成功したら変数に、サーバから送られてきた情報(sendやsendFileなど)が入る。
catch((変数) => {処理}) 通信に失敗したら変数にエラー情報が入る
*/
const API_URL = 'http://localhost:3000'
export default {
    name: "MenuBar",
    props:{
        isHowToButton: Boolean,
        isCriticalButton: Boolean
    },
    data:()=>({
        isBool:false
    }),
    methods:{
        HowToButton:function(){
            axios.get(API_URL + "/MenuBar/howTo")
            .then((res) => {
                //console.logはなぜか出力されない
                console.log(res.data);
                alert(res.data);
            })
            .catch((e) => {
                alert(e);
            })
        },
        CriticalButton:function(){
            axios.get("/MenuBar/criticalPass")
            .then((res) => {
                alert(res.data);
            }).catch(
                (e) =>{
                    alert(e);
                }
            )
        },
        otherButton:function(){
            axios.get("/MenuBar/other")
            .then((res) => {
                alert(res.data);
            })
            .catch((e) => {
                alert(e);
            })
        }
    }
}
</script>
<!--このコンポーネントで使いたいcssファイルはここで指定する-->
<style src = "../css/MenuBar.css"></style>
