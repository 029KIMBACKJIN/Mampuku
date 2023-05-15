<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div class = "mainPage">
    <!--左側-->
    <div class = "left">
      <div class = "MenuBar">
        <MenuBar></MenuBar>
      </div>
      <div class = "MindMap">
      
      </div>
    </div>
    <!--右側-->
    <div class = "right">
      <div class = "Calender">

      </div>
      <div class = "TaskAdd">
        
      </div>
    </div>
  </div>
</template>

<script>
//コンポーネントをimportする
//import HelloWorld from './components/HelloWorld.vue'
import MenuBar from './components/menuBar.vue'

//componentsに追加することで、上記のtemplateタグで表示できる？
export default {
  name: 'App',
  components: {
    //HelloWorld,
    MenuBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
