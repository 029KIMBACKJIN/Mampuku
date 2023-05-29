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
      resDatas:{},
      intervalId:-1,    //繰り返し読んでいるメソッドのインターバルID
      currentDate:null
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
    mounted(){
      //1秒に１回、getCurrentDateを呼び出す(これでスタートされる)。インターバルIDを変数に代入しておく
      this.intervalId = setInterval(this.getCurrentDate, 1000);
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
      },
      getDayToString:function(dayID){
        switch(dayID){
          case 0:
            return "日";
          case 1:
            return "月";
          case 2:
            return "火";
          case 3:
            return "水";
          case 4:
            return "木";
          case 5:
            return "金";
          case 6:
            return "土";
          
        }
      },
      getCurrentDate:function(){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;  //0からのため
        var date = now.getDate();
        var day = this.getDayToString(now.getDay());
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        console.log(year + "年 " + month + "月 " + date + "日 (" + day + ")" + hour + "時 " + min + "分 " + sec + "秒");
        this.currentDate = year + "-" + month + "-" + date + "-" + day + "-" + hour + "-" + min + "-" + sec;
      }
    }
  }
</script>

<style src="./app.css"></style>
