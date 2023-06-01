<template>
  <div>
    <h1>CreateanAccount</h1>

    <div class = "SignUp">
      <form @submit.prevent="signUp">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
          <button type="submit">Sign Up</button>        
      </form>
    </div>
    
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: ""
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
    signUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          alert("会員登録完了！！");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            alert("すでにこのアカウントは存在します");
          }
          console.log(errorCode, errorMessage);
        });
    },
  },
};
</script>

<style src="../css/SignUp.css"></style>
