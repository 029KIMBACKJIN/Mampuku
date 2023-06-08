<template>
    <div class = "SignIn">
      <h1>SignIn</h1>
      <div>
        <form  @submit.prevent="signIn">
          <div class="Email">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="Password">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>  

  </template>
  <script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    name: 'SignIn',
    data() {
      return {
        email: "",
        password: "",
        userMail: "",
      };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      checkAccount() {
        console.log("check");
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        if (user) {
          console.log("ログイン済み");
          this.userMail = user.email;
          console.log(this.userMail);
        } else {
          console.log("ログインしてない");
        }
      },
      signIn() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            //追加。MindMapDrawで感知して向こうで削除する
            sessionStorage.setItem("login", true);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert("サインインできません！\n入力情報収集を確認してください。");
          });
          this.closeModal()
      },
      closeModal() {
        this.$emit('close-modal');
      }
    },
  };
  </script> 

<style src="../css/SingIn.css"></style>