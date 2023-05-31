<template>
    <div class = "AccountSet">
        <div class = "button">
            <button class = "btn-primary" @click="openSignIn">Sign In</button>
        </div>
        <div class = "button">
            <button class = "btn-danger" @click="openSignUp">Sign Up</button>
        </div>
        <div class="modal-overlay" v-if="isSignInOpened" @click="closeSignIn">
            <div class="modal-content" @click="stopPropagation">
                <SignIn v-on:close-modal="closeSignIn" />
            </div>
        </div>
        <div class="modal-overlay" v-if="isSignUpOpened" @click="closeSignUp">
            <div class="modal-content" @click="stopPropagation">
                <SignUp v-on:close-modal="closeSignUp" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

export default{
    name:"AccountSet",
    components: {
        SignIn,
        SignUp
    },
    props:{

    },
    data:()=>({
        isLoggedIn: false,
        isSignInOpened: false,
        isSignUpOpened: false
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
        openSignIn() {
            this.isSignInOpened = true;
        },
        closeSignIn() {
            this.isSignInOpened = false;
        },
        openSignUp() {
            this.isSignUpOpened = true;
        },
        closeSignUp() {
            this.isSignUpOpened = false;
        },
        stopPropagation(event) {
            event.stopPropagation();
        },
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