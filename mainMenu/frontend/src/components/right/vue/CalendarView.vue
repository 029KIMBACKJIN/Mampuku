<template>
    <div class="calendar">
      <div class="header">
        <button @click="previousMonth">&lt;</button>
        <h1>{{ currentMonth }}</h1>
        <button @click="nextMonth">&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in weeks" :key="week">
            <td v-for="day in week" :key="day.date" :class="{ today: isToday(day) }" @click="selectDate(day)">
              {{ day.date }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getAuth } from 'firebase/auth';
  import axios from 'axios';

  export default {
    data() {
      return {
        currentMonth: '',
        currentDate: null,
        selectedDate: null,
        daysOfWeek: ['日', '月', '火', '水', '木', '金', '土'],
        weeks: [],
        deadlines: []
      };
    },
    created() {
      console.log("캘린더 생성");
      this.generateCalendarWithUID();
    },
    methods: {
      previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.currentMonth = this.getMonthYearString(this.currentDate);
        this.generateCalendar();
      },
      nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.currentMonth = this.getMonthYearString(this.currentDate);
        this.generateCalendar();
      },
      generateCalendar() {
        const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - startDate.getDay());
  
        const endDate = new Date(lastDayOfMonth);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
        const weeks = [];
        let week = [];
        let currentDate = new Date(startDate);
  
        while (currentDate <= endDate) {
          if(currentDate.getMonth() === this.currentDate.getMonth()){
            week.push({
              date: currentDate.getDate(),
              month: currentDate.getMonth(),
              year: currentDate.getFullYear()
            });
          } else {
            week.push({
              date: null,
              month: currentDate.getMonth(),
              year: currentDate.getFullYear()
            });
          }
          if (currentDate.getDay() === 6) {
            weeks.push(week);
            week = [];
          }
  
          currentDate.setDate(currentDate.getDate() + 1);
        }
  
        this.weeks = weeks;
      },
      isToday(day) {
        const today = new Date();
        return day.date === today.getDate() && day.month === today.getMonth() && day.year === today.getFullYear();
      },
      isSelected(day) {
        return this.selectedDate && day.date === this.selectedDate.getDate() &&
          day.month === this.selectedDate.getMonth() && day.year === this.selectedDate.getFullYear();
      },
      selectDate(day) {
        this.selectedDate = new Date(day.year, day.month, day.date);
      },
      getMonthYearString(date) {
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${year}年 ${month}`;
      },
      generateCalendarWithUID() {
        const user = getAuth().currentUser;
        if (user) {
          console.log("사인인중");
          const uid = user.uid;
          axios.post("/MindMap/all", {
            userId: uid
          }).then((res) =>{
            console.log(res.data);
            for(let key in res.data) {
              console.log(res.data[key]);
              if(key == "deadline"){
                console.log(res.data[key]);
              }
            }
          }).catch((e) =>{
            alert(e);
          })
        } else {
          console.log("사인아웃상태");
          this.currentDate = new Date();
          this.currentMonth = this.getMonthYearString(this.currentDate);
          this.generateCalendar();
        }
      }
    }
  };
  </script>
  
  <style src="../css/CalendarView.css"></style>
  