<template>
  <div class = "TaskEdit">
      <h1>タスク編集</h1>
      <div class="TaskEditHelpButton">
        <button class="TaskEditQuestionButton" @click="openModal">?</button>
      </div>
      <div class = "black-bg" v-if = "isTaskFormOpen == true">
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
            <input v-model="inputComplete" type = "checkbox" id = "complete" name = "complete">
            <br><br>
            <p>
              親ノード <!-- (oarentNode) -->
            </p>
            <select v-model="select" name="nodes" id="TaskNodesEdit" v-on:mousedown="selectNodes">
              <option id = "nowParent" value="">親ノード</option>
            </select>
            <br><br>

          </form>
          <button v-on:click="createTask">タスク登録 <!-- (Edit Task) --></button>
          <button v-on:click="deleteTask" style="color: red;">タスク削除 <!-- (Delete Task) --></button>
        </div>
      </div>
      <div class="taskedit-modal-container" v-if="isModalOpen" @click="closeModal">
          <div class="taskedit-modal-content">
            <p>{{ modalContent }}</p>
          </div>
        </div>
  </div>

</template>

<script>
import axios from 'axios';
import { getAuth } from 'firebase/auth';


export default{
    name:"TaskEdit",
    props:{
      isNodeClicked:Boolean,
      isNodeEdit:Boolean,
      currentNodeDatas:Object,
    },
    data:()=>({
        isTaskFormOpen : false,
        resDatas:{
        },
        isTaskEditSwitch: false, 
        taskName:"",
        taskContent:"",
        deadline:null,
        complete:false,

        isModalOpen: false,
        modalContent: "左側のマップに表示されているタスクをダブルクリックすれば編集ができるようになります。",

        parentId: -1,
        select:-1

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
      isNodeEdit:function(){
        var datas = this.currentNodeDatas;
        this.inputTaskName = datas.title;
        this.inputTaskContent = datas.contents;
        //こうしないと日付が反映されない。
        this.inputDeadLine = (datas.deadline).split("T")[0];
        this.inputComplete = datas.complelte;
        this.select = -1;
        this.initOption(datas.parentId);

        //タスク編集画面表示
        this.isTaskFormOpen = true;
        
      },
      select:function(){
        //ドロップダウンメニューが選択されたら呼ばれる。valueが取れる
        console.log(this.select);
        axios.post("/TaskEdit/findParent",{
          id: this.select
        }).then((res)=>{
          //親ノードを決定する
          this.parentId = res.data.id;
        }).catch(()=>{
          //alert(e);
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

      init: function(){
        //入力内容をクリアする
        this.taskName = "";
        this.taskContent = "";
        this.deadline = null;
        this.complete = false;
      },
      initOption: function(parentId){
        //選択肢の初期状態
        axios.post("/TaskEdit/findParent", {
          id: parentId
        }).then((res)=>{
          let doc = document.getElementById("nowParent");
          if(doc != null){
            doc.textContent = res.data.title + "(現在の親ノード)";
          }
          }).catch(()=>{
          //alert(e);
          let doc = document.getElementById("nowParent");
          if(doc != null){
            doc.textContent = "親ノードなし";
            doc.value = "";
          }
        })

      },
      toggle: function() {
        if(this.isTaskFormOpen == true) this.isTaskFormOpen = false;
        else this.isTaskFormOpen = true;
      },
      createTask: function() {
        //送信ボタンを押したとき
        //データを送りたい場合はpost（express側も）と書いてリクエストする
        const user = getAuth().currentUser;
        const uid = user.uid;
        var datas = this.currentNodeDatas;

        //エラー回避用
        if(this.inputTaskName == this.currentNodeDatas.title && 
        this.inputTaskContent == this.currentNodeDatas.contents && 
        this.inputDeadLine == this.currentNodeDatas.deadline.split("T")[0] && 
        this.inputComplete == this.currentNodeDatas.complelte && 
        this.select == -1
        ){
          let ok = confirm("変更が無いようです。編集をやめますか？");
          if(ok){
            this.isTaskFormOpen = false;
          }
          return;
        }
        axios.post("/TaskEdit/update", {
          //ここにデータを記載 idは自動なのでいらない。parentId, childIdはどうやって求める？
          id:datas.id,
          title: this.inputTaskName,
          contents:this.inputTaskContent,
          deadline:this.inputDeadLine,
          complete:this.inputComplete,
          parentId:this.parentId,
          childId:datas.childId,
          userId: uid
        }).then((res) =>{
          //レスポンスの結果を表示
                alert("データを変更しました。\n変更内容" + 
              "\nタイトル：" + res.data.title +
              "\n内容：" + res.data.contents + 
              "\n締め切り日：" + res.data.deadline +  
              "\n達成状況：" + (res.data.complelte ?"達成":"未達成"));
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
          this.isTaskEditSwitch = !this.isTaskEditSwitch;
          this.inputTaskName = "";
          this.$emit("editFlag", this.isTaskEditSwitch);
          this.$emit("resEditDatas", this.resDatas);

          //入力内容をクリアする
          this.taskName = "";
          this.taskContent = "";
          this.deadline = null;
          this.complete = false;
          this.clearOptions();

          this.isTaskFormOpen = false;
        }).catch((e) =>{
          alert(e);
        })

      },
      deleteTask:function(){
        var ok = window.confirm("本当に削除しますか？");
        //「OK」ボタンを押したなら
        if(ok){
          //送信ボタンを押したとき
          //データを送りたい場合はpost（express側も）と書いてリクエストする
          const user = getAuth().currentUser;
          const uid = user.id;
          var datas = this.currentNodeDatas;
          axios.post("/TaskEdit/delete", {
            //ここにデータを記載 idは自動なのでいらない。parentId, childIdはどうやって求める？
            id:datas.id,
            title: this.inputTaskName,
            contents:this.inputTaskContent,
            deadline:this.inputDeadLine,
            complete:this.inputComplete,
            parentId:datas.parentId,
            childId:datas.childId,
            userId: uid
          }).then((res) =>{
            //レスポンスの結果を表示
                alert("データを削除しました。\n削除内容" + 
                "\nタイトル：" + res.data.title +
                "\n内容：" + res.data.contents + 
                "\n締め切り日：" + res.data.deadline +  
                "\n達成状況：" + (res.data.complelte ?"達成":"未達成"));
            //正常にデータベースに登録されたら、親コンポーネントを通じて、MindMapDraw.vueへデータを渡す。
            //createdFlagという名前でtrueというデータを親コンポーネントに渡す
            //変更されたかどうかをMindMapDrawで検知したいので、実行されるたびに変数の値を入れ替える
            //userIdはいらないので送らない
            this.resData = {
              id: res.data.id,
              title: res.data.title,
              contents: res.data.contents,
              deadline: res.data.deadline,
              complete: res.data.complelte,
              parentId: res.data.parentId,
              childId: res.data.childId
            }
            this.isTaskEditSwitch = !this.isTaskEditSwitch;
            this.$emit("deleteFlag", this.isTaskEditSwitch);
            this.$emit("resDeleteData", this.resData);

            this.init();

            this.isTaskFormOpen = false;
          }).catch((e) =>{
            alert(e);
          })
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
        let element = this.clearOptions();
        const user = getAuth().currentUser;
        //データベースから、登録されているタスク一覧を表示させる
        axios.post("/TaskEdit/all", {
          uid: user.uid
        }).then((res)=>{          
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
      clearOptions:function(){
        let element = document.getElementById("TaskNodesEdit");
        //オプションをクリアする(最初以外)
        while(element.children.length > 1){
          element.removeChild(element.lastChild);
        }
        return element;
      },
      mouseDoubleClick: function(event){
        //MindMapNodeのbuttonタグのidが取得できる。これをテーブルのidにしてしまえば、ここからaxios.get()で編集した内容を送ればいける？
        console.log("ダブルクリックした。データ：" + event.target.id);
      }
    }
}
</script>

<style src="../css/TaskEdit.css"></style>