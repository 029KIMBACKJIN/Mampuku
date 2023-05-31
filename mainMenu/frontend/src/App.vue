<template>
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div class = "mainPage" >
    <!--左側-->
    <div class = "left">
      <div class = "Title">
        <TitleLogo/>
      </div>
      <div class = "MenuBar">
        <MenuBar/>
      </div>
      <div class = "MindMap">
        <MindMap :isTaskCreated="isTaskCreated" :resDatas="resDatas"  v-on:isEditFlag="sendFlagToEdit" v-on:resEditDatas="sendDatasToEdit" :isTaskEdit="isTaskEdit"/>        
      </div>
    </div>
    <!--右側-->
    <div class = "right">
      <div class = "Account">
        <AccountSet/>
        <router-view></router-view>
      </div>
      <div class = "Calender">
        <CalenderDate/>
      </div>  
      <div class = "TaskAdd">
        <TaskAdd v-on:createdFlag ="sendToMindMapDraw" v-on:resDatas="sendToMindMapDraw2"/>        
      </div>
      <div class = "TaskEdit">
        <TaskEdit v-on:createdFlag ="sendToMindMapDraw" v-on:resDatas="sendToMindMapDraw2" :isNodeEdit="isEditFlag" :currentNodeDatas="resDatas" v-on:editFlag="sendEditToMindMapDraw" v-on:resEditDatas="sendToMindMapDraw2"/>        
      </div>
    </div>
  </div>    
</template>

<script>
  //コンポーネントをimportする
  //import HelloWorld from './components/HelloWorld.vue'
  import TitleLogo from './components/left/vue/Title.vue'
  import MenuBar from './components/left/vue/MenuBar.vue'
  import MindMap from './components/left/vue/MindMap.vue'
  import AccountSet from './components/right/vue/AccountSet.vue'
  import CalenderDate from './components/right/vue/Calender.vue'
  import TaskAdd from './components/right/vue/TaskAdd.vue'
  import TaskEdit from './components/right/vue/TaskEdit.vue'

  //componentsに追加することで、上記のtemplateタグで表示できる？
  export default {
    name: 'App',
    data: ()=>({
      isTaskCreated:false,
      isEditFlag:false,
      isTaskEdit:false,
      resDatas:{}
    }),
    components: {
      //HelloWorld,
      TitleLogo,
      MenuBar,
      MindMap,
      AccountSet,
      CalenderDate,
      TaskAdd,
      TaskEdit
    },
    methods:{
      sendToMindMapDraw:function(event){
        console.log(event + "のデータをTaskAddから受け取りました");
        this.isTaskCreated = event;
      },
      sendEditToMindMapDraw:function(event){
        console.log(event + "のデータをTaskEditから受け取りました");
        this.isTaskEdit = event;
      },
      sendToMindMapDraw2:function(event){
        console.log("MindMapDrawに送るデータたち\n" + 
        event.id + "\n" + 
        event.title + "\n" + 
        event.contents + "\n" + 
        event.deadline + "\n" + 
        event.complete + "\n" + 
        event.parentId + "\n" + 
        event.childId );

        this.resDatas = event;
      },
      sendFlagToEdit:function(event){
        this.isEditFlag = event;
      },
      sendDatasToEdit:function(event){
        this.resDatas = event;
      }
    }
  }
</script>

<style src="./app.css"></style>
