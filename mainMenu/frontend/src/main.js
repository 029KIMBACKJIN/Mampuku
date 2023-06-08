import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import router from './router/index.js'

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.VUE_APP_API_KEY,
//     authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//     projectId: process.env.VUE_APP_PROJECT_ID,
//     storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//     appId: process.env.VUE_APP_APP_ID,
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCf1ihZuy6iia5kqrD16eQGYIAPnWG7BD0",
  authDomain: "dynamictaskmanagement.firebaseapp.com",
  projectId: "dynamictaskmanagement",
  storageBucket: "dynamictaskmanagement.appspot.com",
  messagingSenderId: "194437187110",
  appId: "1:194437187110:web:ad9a43f8c037b34e02c8e7",
  measurementId: "G-Q4ZNZF61NT"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
const eventBus = {};
app.provide('eventBus', eventBus);

app.use(router).use(store).mount('#app');