<template>
    <div class = "TaskAdd">
        <h1>タスク追加・編集</h1>
        <button @click="toggle()">Create Task</button>
        <div class = "black-bg" v-if = "isTaskFormOpen == true">
        <div class = "white-bg">
          <form id = "task">
            <p>task name</p>
            <input type = "text" id = "taskName" name = "task name">

            <p>task contents</p>
            <input type = "text" id = "taskContent" name = "task contents">

            <p>dead line</p>
            <input type = "date" id = "deadLine" name = "dead line">

            <p>complelete</p>
            <input type = "checkbox" id = "complelete" name = "complelete">
          </form>
          <button>Create Task</button>
        </div>
      </div>
  </div>

</template>

<script>
export default{
    name:"TaskAdd",
    props:{

    },
    data:()=>({
        isTaskFormOpen : false

    }),
    methods: {
      toggle: function() {
        if(this.isTaskFormOpen == true) this.isTaskFormOpen = false;
        else this.isTaskFormOpen = true;
      },
      createTask: function() {
        
      }
    }
}
</script>

<style src="../css/TaskAdd.css"></style>