<template>
  <div class = "TaskEdit">
      <h1>タスク編集</h1>
      <button @click="clickCreateTask()">Edit Task</button>
      <div class = "black-bg" v-if = "isTaskFormOpen == true">
        <div class = "white-bg">
          <form id = "task">
            <p class="alert alert-danger d-flex align-items-center" role="alert">
              ※タスク名(Task Name)
            </p>
            <!--v-modelで変数の中身の変更をリアルタイムで監視する-->
            <input v-model="inputTaskName" type = "text" id = "taskName" name = "task name">

            <br><br>
            <p>
              タスク内容(Task Contents)
            </p>
            <input v-model="inputTaskContent" type = "text" id = "taskContent" name = "task contents">

            <br><br><p class="alert alert-danger d-flex align-items-center" role="alert">※締め切り日(dead line)</p>
            <input v-model="inputDeadLine" type = "date" id = "deadLine" name = "dead line">

            <br><br><p>
              終了フラグ(complelete)
            </p>
            <input v-model="inputComplete" type = "checkbox" id = "complelete" name = "complelete">
          </form>
        <button v-on:click="createTask">タスク登録(Edit Task)</button>
        </div>
      </div>
  </div>

</template>

<script>
import axios from 'axios';

export default{
    name:"TaskEdit",
    props:{

    },
    data:()=>({
        isTaskFormOpen : false,
        resDatas:{
        },
        isTaskCreatedSwitch: false, 
        taskName:"",
        taskContent:"",
        deadline:null,
        complete:false
    }),
    computed:{
      //値の監視？
      inputTaskName:{
        get(){
          return this.taskName;
        },
        set(value){
          this.taskName = value;
        }
      },
      inputTaskContent:{
        get(){
          return this.taskContent;
        },
        set(value){
          this.taskContent = value;
        }
      },
      inputDeadLine:{
        get(){
          return this.deadline;
        },
        set(value){
          this.deadline = value;
        }
      },
      inputComplete:{
        get(){
          return this.complete;
        },
        set(value){
          this.complete = value;
        }
      }
    },
    methods: {
      toggle: function() {
        if(this.isTaskFormOpen == true) this.isTaskFormOpen = false;
        else this.isTaskFormOpen = true;
      },
      createTask: function() {
        //送信ボタンを押したとき
        //データを送りたい場合はpost（express側も）と書いてリクエストする
        axios.post("/TaskEdit/update", {
          //ここにデータを記載 idは自動なのでいらない。parentId, childIdはどうやって求める？
          title: this.taskName,
          contents:this.taskContent,
          deadline:this.deadline,
          complete:this.complete
        }).then((res) =>{
          //レスポンスの結果を表示
                alert("データを変更しました。\n変更内容" + 
              "\nタイトル：" + res.data.title +
              "\n内容：" + res.data.contents + 
              "\n締め切り日：" + res.data.deadline +  
              "\n達成状況：" + (res.data.complete ?"達成":"未達成"));
          //正常にデータベースに登録されたら、親コンポーネントを通じて、MindMapDraw.vueへデータを渡す。
          //createdFlagという名前でtrueというデータを親コンポーネントに渡す
          //変更されたかどうかをMindMapDrawで検知したいので、実行されるたびに変数の値を入れ替える
          this.resDatas = {
            id: res.data.id,
            title: res.data.title,
            contents: res.data.contents,
            deadline: res.data.deadline,
            complete: res.data.complelte,
            parentId: res.data.parentId,
            childId: res.data.childId
          }
          this.isTaskCreatedSwitch = !this.isTaskCreatedSwitch;
          this.$emit("createdFlag", this.isTaskCreatedSwitch);
          this.$emit("resDatas", this.resDatas);

          //入力内容をクリアする
          this.taskName = "";
          this.taskContent = "";
          this.deadline = "";
          this.complete = false;
        }).catch((e) =>{
          alert(e);
        })
      },
      clickCreateTask : function() {
        if(this.isTaskFormOpen == true) {
          this.createTask();
          this.toggle();
        } else {
          this.toggle();
        }
      }
    }
}
</script>

<style src="../css/TaskEdit.css"></style>