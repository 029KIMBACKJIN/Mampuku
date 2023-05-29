<template>
    <div class = "AccountSet">
        <!-- <div class = "button"><button v-on:click="Singin" class = "btn-primary">アカウント</button></div>  -->
        <!-- <div class = "button"><button v-on:click="LogOutButton" class = "btn-danger">会員登録</button></div>  -->
        <div class = "button">
            <router-link to = "/signin">
                <button class = "btn-primary">SignIn</button>
            </router-link>
        </div>
        <div class = "button" v-if="isLoggedIn == false">
            <router-link to = "/signup">
                <button class = "btn-danger">SignUp</button>
            </router-link>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

export default{
    name:"AccountSet",
    props:{

    },
    data:()=>({
        isLoggedIn: false
    }),
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // ログイン状況
            this.isLoggedIn = true;
        } else {
            // ログアウト状況
            this.isLoggedIn = false;
        }
        });
    },
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