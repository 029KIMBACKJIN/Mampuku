<template>
    <div class = "AccountSet">
        <div class = "button"><button v-on:click="AccountButton" class = "btn btn-primary" style = "width:45%; height:3vw; max-width: 100%; max-height: 100vw; font-size: 150%;">アカウント</button></div> 
        <div class = "button"><button v-on:click="LogOutButton" class = "btn btn-danger" style = "width:45%; height:3vw; max-width: 100%; max-height: 100vw; font-size: 150%;">ログアウト</button></div> 
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name:"AccountSet",
    props:{

    },
    data:()=>({

    }),
    methods:{
        AccountButton:function(){
            axios.get("/AccountSet/account")
            .then((res)=>{
                alert(res.data);
            })
            .catch((e) =>{
                alert(e);
            })
        },
        LogOutButton:function(){
            axios.get("/AccountSet/logOut")
            .then((res)=>{
                alert(res.data);
            })
            .catch((e) =>{
                alert(e);
            })
        }
    }
}
</script>
<style src="../css/AccountSet.css"></style>