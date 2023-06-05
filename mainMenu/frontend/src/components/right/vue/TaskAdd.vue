<template>
    <div class = "TaskAdd">
        <h1>タスク追加</h1>
        <div class="TaskAddHelpButton">
            <button class="TaskAddQuestionButton" @click="openModal">?</button>
        </div>
        <!--
        <button @click="clickCreateTask()">Create Task</button>
        -->
        <div class = "black-bg" v-if = "isTaskFormOpen == false">
          <div class = "white-bg">
            <form id = "task">
              <p v-if="inputTaskName == ''" class="alert alert-danger d-flex align-items-center" role="alert">
                <svg v-if="inputTaskName == ''" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
                タスク名 <!-- (Task Name) -->
              </p>
              <p v-else>
                タスク名 <!-- (Task Name) -->
              </p>
              <!--v-modelで変数の中身の変更をリアルタイムで監視する-->
              <input v-model="inputTaskName" type = "text" id = "taskName" name = "task name">

              <br><br>
              <p>
                タスク内容 <!-- (Task Contents) -->
              </p>
              <input v-model="inputTaskContent" type = "text" id = "taskContent" name = "task contents">

              <br><br><p v-if="inputDeadLine==null" class="alert alert-danger d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
                締め切り日 <!-- (dead line) -->
              </p>
              <p v-else>
                締め切り日 <!-- (dead line) -->
              </p>
              <input v-model="inputDeadLine" type = "date" id = "deadLine" name = "dead line">

              <br><br><p>
                終了フラグ <!-- (complelete) -->
              </p>
              <input v-model="inputComplete" type = "checkbox" id = "complelete" name = "complelete">
              <br><br>
              <p>
                親ノード <!-- (oarentNode) -->
              </p>
              <select v-model="select" name="nodes" id="TaskNodes" v-on:mousedown="selectNodes">
                <option value="">親ノード選択</option>
              </select>
              <br><br>
            </form>
            <button v-on:click="createTask">タスク登録 <!-- (Create Task) --></button>
          </div>
        </div>
        <div class="taskadd-modal-container" v-if="isModalOpen" @click="closeModal">
          <div class="taskadd-modal-content">
            <p>{{ modalContent }}</p>
          </div>
        </div>
    </div>

   

</template>

<script>
import { getAuth } from 'firebase/auth';
import axios from 'axios';

export default{
    name:"TaskAdd",
    props:{

    },
    data:()=>({
        isTaskFormOpen : false,
        resDatas:{
        },
        isTaskCreatedSwitch: false, 
        select:"親ノード選択",
        taskName:"",
        taskContent:"",
        deadline:null,
        complete:false,
        parentId: -1,
        childId: -1,
        userId:"",
        isModalOpen: false,
        modalContent: "登録したタスクが下の領域に表示されます。"
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
    watch:{
      select:function(){
        //ドロップダウンメニューが選択されたら呼ばれる。valueが取れる
        console.log(this.select);
        axios.post("/TaskAdd/findParent",{
          id: this.select
        }).then((res)=>{
          //親ノードを決定する
          this.parentId = res.data.id;
        }).catch((e)=>{
          alert(e);
        });
      }
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      toggle: function() {
        if(this.isTaskFormOpen == true) this.isTaskFormOpen = false;
        else this.isTaskFormOpen = true;
      },
      createTask: function() {
        const user = getAuth().currentUser;
        if (user) {
          // ログインした人のUID
          const uid = user.uid;
          //送信ボタンを押したとき
          //データを送りたい場合はpost（express側も）と書いてリクエストする
          axios.post("/TaskAdd/create", {
            //ここにデータを記載 idは自動なのでいらない。parentId, childIdはどうやって求める？
            title: this.taskName,
            contents:this.taskContent,
            deadline:this.deadline,
            complete:this.complete,
            parentId:this.parentId,
            childId:-1,
            userId: uid
          }).then((res) =>{
            //レスポンスの結果を表示
                alert("データを登録しました。\n登録内容" + 
                "\nタイトル：" + res.data.title +
                "\n内容：" + res.data.contents + 
                "\n締め切り日：" + res.data.deadline +  
                "\n達成状況：" + (res.data.complelte ?"達成":"未達成"));  //complelteはスペルミスではない。モデルのテーブルのカラム名がそうなっているから
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
              childId: res.data.childId,
              userId: res.data.userId
            },
            this.isTaskCreatedSwitch = !this.isTaskCreatedSwitch;
            this.$emit("createdFlag", this.isTaskCreatedSwitch);
            this.$emit("resDatas", this.resDatas);

          }).catch((e) =>{
            alert(e);
          })
        } else {
          // ログインしてない場合の処理
          alert("サインインしてください");
        }
        
      },
      clickCreateTask : function() {
        if(this.isTaskFormOpen == true) {
          this.createTask();
          this.toggle();
        } else {
          this.toggle();
        }
      },
      selectNodes:function(){
        var element = document.getElementById("TaskNodes");
        //オプションをクリアする(最初以外)
        while(element.children.length > 1){
          element.removeChild(element.lastChild);
        }
        //const user = getAuth().currentUser;
        //データベースから、登録されているタスク一覧を表示させる
        axios.get("/TaskAdd/all").then((res)=>{          
          for(var i = 0; i < res.data.length; i++){
            var option = document.createElement("option");          
            //option.setAttribute("id",res.data[i].id);
            option.setAttribute("value", res.data[i].id);
            option.text = res.data[i].title;
            element.appendChild(option);
          }
        }).catch((e)=>{
          alert(e.message);
        })

      },
      // DB操作確認のため仮で作ったFuntion
      // Create Task ボタンを押したらTitleに入力した数字にてDBで検索
      retrieveWithId : function() {
        if(this.isTaskFormOpen == true) {
          axios.post("/TaskAdd/retrieve", {
            id: this.taskName
          }).then((res) =>{
            //console.log(res.data.id);
            console.log(res.data.title);
            console.log(res.data.contents);
          }).catch((e) =>{
            alert(e);
          })
          this.toggle();
        } else {
          this.toggle();
        }
      }
    }
}
</script>

<style src="../css/TaskAdd.css"></style>