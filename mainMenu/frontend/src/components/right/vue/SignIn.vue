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
  import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
  import { onAuthStateChanged } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        userMail: "",
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn; // Vuex Store의 로그인 상태를 가져옴
      },
    },
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
            this.$store.dispatch('login', { username: 'example', password: 'password' });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      },
      logout(){
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        sessionStorage.removeItem("currentUser");
        this.userMail = "";
        this.$store.dispatch('logout');
        }).catch((error) => {
        // An error happened.
        console.log(error);
        });
      }
    },
  };
  </script> 

<style src="../css/SingIn.css"></style>
  