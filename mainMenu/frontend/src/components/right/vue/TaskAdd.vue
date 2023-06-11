<template>
    <div class = "TaskAdd">
        <h1>タスク追加</h1>
        <div class="TaskAddHelpButton">
            <button class="TaskAddQuestionButton" @click="openModal">?</button>
        </div>
        <div class = "black-bg" v-if = "isTaskFormOpen == false">
          <div class = "white-bg">
            <form id = "formTaskAdd">
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
              <div id = "parents" v-on:mouseenter="selectNodes">
                <button type="button" id = "none" name="button1" value="-1" style="background-color: #FFFFFF;">親ノード無し</button>
              </div>
              <!--
              <select v-model="select" name="nodes" id="TaskNodes" v-on:mousedown="selectNodes">
                <option name = "" value="">なし</option>
              </select>
              -->
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
        //select:"親ノード選択",
        taskName:"",
        taskContent:"",
        deadline:null,
        complete:false,
        parentId: -1,
        selectParentIds:{},
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
      /*
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
      */
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      init:function(){
        this.inputTaskName = "";
        this.inputTaskContent = "";
        this.inputDeadLine = null;
        this.inputComplete = false;
        this.clearOptions();
      },
      toggle: function() {
        if(this.isTaskFormOpen == true) this.isTaskFormOpen = false;
        else this.isTaskFormOpen = true;
      },
      createTask: function() {
        const user = getAuth().currentUser;
        if (user) {
          if(this.inputTaskName == "" || this.inputDeadLine == null){
            this.errorAlert();
            return ;
          }
          // ログインした人のUID
          const uid = user.uid;

          var parentKeys = Object.keys(this.selectParentIds);
          var parentIds = "";
          //親ノードたちを決定する。保存形式は「1,2,3,4,5」のような形
          for(let i = 0; i < parentKeys.length; i++){
            if(this.selectParentIds[parentKeys[i]]){
              var key = parentKeys[i].split('_')[1];
              if(i == parentKeys.length - 1){
                parentIds += key;
              }
              else{
                parentIds += key + ",";
              }
            }
          }
          //型も含めて厳密に判断
          if(parentIds === ""){
            parentIds = "-1";   //一応使っているところある。
          }
          //終端が「,」で終わっている場合除去する
          else if(parentIds.split('')[parentIds.split('').length - 1] == ","){
            parentIds = parentIds.slice(0, parentIds.split('').length - 1);
          }
          //送信ボタンを押したとき
          //データを送りたい場合はpost（express側も）と書いてリクエストする
          axios.post("/TaskAdd/create", {
            //ここにデータを記載 idは自動なのでいらない。parentId, childIdはどうやって求める？
            title: this.taskName,
            contents:this.taskContent,
            deadline:this.deadline,
            complete:this.complete,
            parentId:parentIds,
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
            this.init();
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
      errorAlert:function(){
        let nameError = this.inputTaskName == "" ? "タスク名\n":"";
        let dateError = this.inputDeadLine == null ? "締め切り日":"";
        alert(
          "未入力の項目があります！\n" + 
          nameError + 
          dateError
        );

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
        let element = this.clearOptions();
        const user = getAuth().currentUser;
        this.selectParentIds = {};
        //データベースから、登録されているタスク一覧を表示させる
        axios.post("/TaskAdd/all", {
          uid: user.uid
        }).then((res)=>{          
          for(var i = 0; i < res.data.length; i++){
            //ボタン生成
            let idName = "parent_" + res.data[i].id;
            if(document.getElementById(idName) == null){
              var button = document.createElement("button");
              button.setAttribute("type", "button");
              button.setAttribute("id", idName);
              button.setAttribute("value", idName);
              button.setAttribute("style", "background-color:#FFFFFF");
              button.textContent = res.data[i].title;
              //チェックボックスの状態が変わったら特定の関数を呼ぶようにする。
              button.addEventListener("click", this.selectParents);
              element.appendChild(button);
            }
          }
        }).catch((e)=>{
          alert(e.message);
        })

      },
      clearOptions:function(){
        //let element = document.getElementById("TaskNodes");
        let element = document.getElementById("parents");
        //オプションをクリアする(最初以外)
        while(element.children.length > 1){
          element.removeChild(element.lastChild);
        }
        return element;
      },
      selectParents:function(event){
        //チェックボックスのどれか１つでも変化があれば呼ばれる。valueが取れる
        console.log(event.target.id);
        let idName = event.target.id;
        var element = document.getElementById(event.target.id);
        if(this.selectParentIds[idName] != undefined){
          if(this.selectParentIds[idName] == true){
            this.selectParentIds[idName] = false;
            element.setAttribute("style", "background-color:#FFFFFF");
          }
          else{
            this.selectParentIds[idName] = true;
            element.setAttribute("style", "background-color:#FF0000");
          }
        }
        else{
          this.selectParentIds[idName] = true;
          element.setAttribute("style", "background-color:#FF0000");
        }
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