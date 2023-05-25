<template>
    <div class = "AccountSet">
        <!-- <div class = "button"><button v-on:click="Singin" class = "btn-primary">アカウント</button></div>  -->
        <div class = "button">
            <router-link to = "/signin">
                <button class = "btn-primary">アカウント</button>
            </router-link>
        </div>
        <div class = "button"><button v-on:click="LogOutButton" class = "btn-danger">ログアウト</button></div> 
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