<template>
    <div>
      <h2>SignIn</h2>

      <div class = "SignIn">

        <form  @submit.prevent="signIn">
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>

        <button @click="logout">logout</button>
        <!-- <button @click="checkAccount">確認</button> -->
        <div class = "button">
            <router-link to = "/signup">
                <button class = "btn-danger">SignUp</button>
            </router-link>
        </div>

        <!-- <div v-if="userMail">
            <p>ログイン済みです</p>
            <p>{{ userMail }}</p>
        </div>

        <div v-else>
          <p>ログインしてない</p>
        </div> -->

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
          //追加。MindMapDrawで感知して向こうで削除する
          sessionStorage.setItem("login", true);
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
        }).catch((error) => {
        // An error happened.
        console.log(error);
        });
      }
    },
  };
  </script> 

<style src="../css/SingIn.css"></style>
  