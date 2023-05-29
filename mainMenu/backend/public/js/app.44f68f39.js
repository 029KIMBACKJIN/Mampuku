(function(){"use strict";var e={3795:function(e,t,a){var n=a(9242),s=a(3396);const i={class:"mainPage"},o={class:"left"},l={class:"Title"},d={class:"MenuBar"},r={class:"MindMap"},u={class:"right"},c={class:"Account"},h={class:"Calender"},p={class:"TaskAdd"},m={class:"TaskEdit"};function k(e,t,a,n,k,g){const v=(0,s.up)("TitleLogo"),b=(0,s.up)("MenuBar"),w=(0,s.up)("MindMap"),T=(0,s.up)("AccountSet"),_=(0,s.up)("CalenderDate"),N=(0,s.up)("TaskAdd"),f=(0,s.up)("TaskEdit");return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("div",o,[(0,s._)("div",l,[(0,s.Wm)(v)]),(0,s._)("div",d,[(0,s.Wm)(b)]),(0,s._)("div",r,[(0,s.Wm)(w,{isTaskCreated:e.isTaskCreated,resDatas:e.resDatas,onSendToEdit:g.sendToEdit},null,8,["isTaskCreated","resDatas","onSendToEdit"])])]),(0,s._)("div",u,[(0,s._)("div",c,[(0,s.Wm)(T)]),(0,s._)("div",h,[(0,s.Wm)(_)]),(0,s._)("div",p,[(0,s.Wm)(N,{onCreatedFlag:g.sendToMindMapDraw,onResDatas:g.sendToMindMapDraw2},null,8,["onCreatedFlag","onResDatas"])]),(0,s._)("div",m,[(0,s.Wm)(f,{onCreatedFlag:g.sendToMindMapDraw,onResDatas:g.sendToMindMapDraw2},null,8,["onCreatedFlag","onResDatas"])])])])}const g={class:"Title"},v=(0,s._)("h1",null,"タスク管理×マインドマップ",-1),b=[v];function w(e,t,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",g,b)}var T={name:"TitleLogo",props:{},data:()=>({})},_=a(89);const N=(0,_.Z)(T,[["render",w]]);var f=N;const C={class:"menuBar"},D=(0,s._)("h1",null,"メニューバー",-1),y={class:"buttons"},M={class:"b-btn-group"},x={class:"button"},A={class:"button"},E={class:"button"};function P(e,t,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",C,[D,(0,s._)("div",y,[(0,s._)("div",M,[(0,s._)("div",x,[(0,s._)("button",{onClick:t[0]||(t[0]=(...e)=>o.HowToButton&&o.HowToButton(...e)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"使い方")]),(0,s._)("div",A,[(0,s._)("button",{onClick:t[1]||(t[1]=(...e)=>o.CriticalButton&&o.CriticalButton(...e)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"100%"}},"クリティカルパス")]),(0,s._)("div",E,[(0,s._)("button",{onClick:t[2]||(t[2]=(...e)=>o.otherButton&&o.otherButton(...e)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"その他")])])])])}var B=a(4161),O={name:"MenuBar",props:{isHowToButton:Boolean,isCriticalButton:Boolean},data:()=>({isBool:!1}),methods:{HowToButton:function(){B.Z.get("/MenuBar/howTo").then((e=>{console.log(e.data),alert(e.data)})).catch((e=>{alert(e)}))},CriticalButton:function(){B.Z.get("/MenuBar/criticalPass").then((e=>{alert(e.data)})).catch((e=>{alert(e)}))},otherButton:function(){B.Z.get("/MenuBar/other").then((e=>{alert(e.data)})).catch((e=>{alert(e)}))}}};const I=(0,_.Z)(O,[["render",P]]);var S=I;const U={class:"MindMap"},L=(0,s._)("h1",null,"マインドマップ",-1),j={class:"MindMapDrawArea"};function F(e,t,a,n,i,o){const l=(0,s.up)("MindMapDraw");return(0,s.wg)(),(0,s.iD)("div",U,[L,(0,s._)("div",j,[(0,s.Wm)(l,{isTaskCreated:a.isTaskCreated,resDatas:a.resDatas},null,8,["isTaskCreated","resDatas"])])])}function V(e,t,a,i,o,l){const d=(0,s.up)("MindMapNode");return(0,s.wg)(),(0,s.iD)("div",{id:"MindMapDraw",style:{position:"relative"},onDblclick:t[0]||(t[0]=e=>l.mouseDoubleClick(e)),onPosition:t[1]||(t[1]=(...e)=>l.setLinePosition&&l.setLinePosition(...e))},[(0,s.wy)((0,s._)("div",null,[(0,s.Wm)(d)],512),[[n.F8,!1]])],32)}a(7658);var Z=a(7139);function z(e,t,a,n,i,o){return(0,s.wg)(),(0,s.iD)("button",{id:"circle",style:(0,Z.j5)([{position:"absolute"},{transform:`translate(${e.TaskNode.x}px, ${e.TaskNode.y-e.TaskNode.drawHeight}px) scale(${e.TaskNode.scX}, ${e.TaskNode.scY})`}]),onDblclick:t[0]||(t[0]=(...e)=>o.mouseDoubleClick&&o.mouseDoubleClick(...e)),onMousedown:t[1]||(t[1]=(...e)=>o.mouseClickDown&&o.mouseClickDown(...e)),onMouseup:t[2]||(t[2]=e=>o.mouseClickUp(e)),onMousemove:t[3]||(t[3]=e=>o.mouseDragging(e)),onMouseleave:t[4]||(t[4]=(...e)=>o.mouseLeave&&o.mouseLeave(...e))},(0,Z.zw)(e.TaskNode.taskName),37)}var R={name:"MindMapNode",props:{},data:()=>({ParentNode:{node:null,x:0,y:0},TaskNode:{id:"circle",scX:2,scY:2,x:100,y:100,drawWidth:100,drawHeight:100,taskName:"タスク名",clicking:!1,line1:null,line2:null},ChildNode:{node:null,x:100,y:0}}),components:{},computed:{},methods:{mouseDoubleClick:function(){B.Z.post("/MindMap/doubleClick",{id:this.TaskNode.id,title:this.TaskNode.taskName}).then((e=>{alert(e.data.title)})).catch((e=>{alert(e)}))},mouseClickUp:function(){this.TaskNode.clicking=!1},mouseClickDown:function(){this.TaskNode.clicking=!0},mouseDragging:function(e){this.TaskNode.clicking&&(this.TaskNode.x+=e.movementX,this.TaskNode.y+=e.movementY,null!=this.ParentNode.node&&(this.ParentNode.x=this.ParentNode.node.data.TaskNode.x,this.ParentNode.y=this.ParentNode.node.data.TaskNode.y,this.ParentNode.node.data.ChildNode.x=this.TaskNode.x,this.ParentNode.node.data.ChildNode.y=this.TaskNode.y),null!=this.ChildNode.node&&(this.ChildNode.x=this.ChildNode.node.data.TaskNode.x,this.ChildNode.y=this.ChildNode.node.data.TaskNode.y,this.ChildNode.node.data.ParentNode.x=this.TaskNode.x,this.ChildNode.node.data.ParentNode.y=this.TaskNode.y),null!=this.TaskNode.line1&&(this.TaskNode.line1.setAttribute("x1",this.TaskNode.x),this.TaskNode.line1.setAttribute("y1",this.TaskNode.y),this.TaskNode.line1.setAttribute("x2",this.ParentNode.x),this.TaskNode.line1.setAttribute("y2",this.ParentNode.y)),null!=this.TaskNode.line2&&(this.TaskNode.line2.setAttribute("x1",this.TaskNode.x),this.TaskNode.line2.setAttribute("y1",this.TaskNode.y),this.TaskNode.line2.setAttribute("x2",this.ChildNode.x),this.TaskNode.line2.setAttribute("y2",this.ChildNode.y)),console.log("parent(x:"+this.ParentNode.x+", y:"+this.ParentNode.y+")"),console.log("TaskNode(x:"+this.TaskNode.x+", y:"+this.TaskNode.y+")"),console.log("child(x:"+this.ChildNode.x+", y:"+this.ChildNode.y+")"))},mouseLeave:function(){this.TaskNode.clicking=!1},getTaskName:function(){return this.TaskNode.taskName}}};const W=(0,_.Z)(R,[["render",z]]);var q=W;const H={class:"TaskEdit"},$=(0,s._)("h1",null,"タスク編集",-1),X={key:0,class:"black-bg"},Y={class:"white-bg"},G={id:"task"},J={key:0,class:"alert alert-danger d-flex align-items-center",role:"alert"},K={key:0,xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},Q=(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"},null,-1),ee=[Q],te={key:1},ae=(0,s._)("br",null,null,-1),ne=(0,s._)("br",null,null,-1),se=(0,s._)("p",null," タスク内容(Task Contents) ",-1),ie=(0,s._)("br",null,null,-1),oe=(0,s._)("br",null,null,-1),le={key:2,class:"alert alert-danger d-flex align-items-center",role:"alert"},de=(0,s._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},[(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})],-1),re={key:3},ue=(0,s._)("br",null,null,-1),ce=(0,s._)("br",null,null,-1),he=(0,s._)("p",null," 終了フラグ(complelete) ",-1);function pe(e,t,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",H,[$,(0,s._)("button",{onClick:t[0]||(t[0]=e=>l.clickCreateTask())},"Edit Task"),1==e.isTaskFormOpen?((0,s.wg)(),(0,s.iD)("div",X,[(0,s._)("div",Y,[(0,s._)("form",G,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("p",J,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("svg",K,ee)):(0,s.kq)("",!0),(0,s.Uk)(" タスク名(Task Name) ")])):((0,s.wg)(),(0,s.iD)("p",te," タスク名(Task Name) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>l.inputTaskName=e),type:"text",id:"taskName",name:"task name"},null,512),[[n.nr,l.inputTaskName]]),ae,ne,se,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>l.inputTaskContent=e),type:"text",id:"taskContent",name:"task contents"},null,512),[[n.nr,l.inputTaskContent]]),ie,oe,null==l.inputDeadLine?((0,s.wg)(),(0,s.iD)("p",le,[de,(0,s.Uk)(" 締め切り日(dead line) ")])):((0,s.wg)(),(0,s.iD)("p",re," 締め切り日(dead line) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>l.inputDeadLine=e),type:"date",id:"deadLine",name:"dead line"},null,512),[[n.nr,l.inputDeadLine]]),ue,ce,he,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>l.inputComplete=e),type:"checkbox",id:"complelete",name:"complelete"},null,512),[[n.e8,l.inputComplete]])]),(0,s._)("button",{onClick:t[5]||(t[5]=(...e)=>l.createTask&&l.createTask(...e))},"タスク登録(Edit Task)")])])):(0,s.kq)("",!0)])}var me={name:"TaskEdit",props:{isNodeClicked:Boolean,currentNodeDatas:Object},data:()=>({isTaskFormOpen:!1,resDatas:{},isTaskCreatedSwitch:!1,taskName:"",taskContent:"",deadline:null,complete:!1}),computed:{inputTaskName:{get(){return this.taskName},set(e){this.taskName=e}},inputTaskContent:{get(){return this.taskContent},set(e){this.taskContent=e}},inputDeadLine:{get(){return this.deadline},set(e){this.deadline=e}},inputComplete:{get(){return this.complete},set(e){this.complete=e}}},watch:{},methods:{toggle:function(){1==this.isTaskFormOpen?this.isTaskFormOpen=!1:this.isTaskFormOpen=!0},createTask:function(){B.Z.post("/TaskEdit/update",{title:this.taskName,contents:this.taskContent,deadline:this.deadline,complete:this.complete}).then((e=>{alert("データを変更しました。\n変更内容\nタイトル："+e.data.title+"\n内容："+e.data.contents+"\n締め切り日："+e.data.deadline+"\n達成状況："+(e.data.complete?"達成":"未達成")),this.resDatas={id:e.data.id,title:e.data.title,contents:e.data.contents,deadline:e.data.deadline,complete:e.data.complelte,parentId:e.data.parentId,childId:e.data.childId},this.isTaskCreatedSwitch=!this.isTaskCreatedSwitch,this.$emit("createdFlag",this.isTaskCreatedSwitch),this.$emit("resDatas",this.resDatas),this.taskName="",this.taskContent="",this.deadline=null,this.complete=!1})).catch((e=>{alert(e)}))},clickCreateTask:function(){1==this.isTaskFormOpen?(this.createTask(),this.toggle()):this.toggle()},mouseDoubleClick:function(e){console.log("ダブルクリックした。データ："+e.target.id)}}};const ke=(0,_.Z)(me,[["render",pe]]);var ge=ke,ve={name:"MindMapDraw",props:{isTaskCreated:Boolean,resDatas:Object,width:{type:Number,default:1e4},height:{type:Number,default:1e4}},data:()=>({isCreateNode:!1,nodes:[]}),components:{MindMapNode:q},mounted(){console.log("ページが読み込まれました");const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","canvas"),e.setAttribute("width",this.width),e.setAttribute("height",this.height),e.setAttribute("viewbox","0 0 1000 1000"),e.setAttribute("style","background-color:aqua"),document.getElementById("MindMapDraw").appendChild(e)},watch:{isTaskCreated:function(){console.log("タスクが作成されました！！！"),console.log("到着データ\n"+this.resDatas.id+"\n"+this.resDatas.title+"\n"+this.resDatas.contents+"\n"+this.resDatas.deadline+"\n"+this.resDatas.complete+"\n"+this.resDatas.parentId+"\n"+this.resDatas.childId);const e=(0,n.ri)(q),t=document.createElement("div");t.setAttribute("id","node"+this.nodes.length),t.setAttribute("v-on:dblclick",ge.methods.mouseDoubleClick),e.mount(t),e._instance.data.TaskNode.id=this.resDatas.id,e._instance.data.TaskNode.taskName=this.resDatas.title,e._instance.data.ParentNode.id=this.resDatas.parentId,e._instance.data.ChildNode.id=this.resDatas.childId,e._instance.data.TaskNode.drawHeight=this.height;const a=document.createElementNS("http://www.w3.org/2000/svg","line");a.setAttribute("id","line1"),a.setAttribute("x1",e._instance.data.TaskNode.x),a.setAttribute("y1",e._instance.data.TaskNode.y),a.setAttribute("x2",e._instance.data.ParentNode.x),a.setAttribute("y2",e._instance.data.ParentNode.y),a.setAttribute("stroke","#008080"),a.setAttribute("stroke-width",5),e._instance.data.TaskNode.line1=a,this.nodes.push(e._instance),this.nodes.length>=2&&(this.nodes[this.nodes.length-1].data.ParentNode.node=this.nodes[this.nodes.length-2],this.nodes[this.nodes.length-2].data.ChildNode.node=this.nodes[this.nodes.length-1],e._instance.data.ParentNode.node.data.TaskNode.line2=a),document.getElementById("canvas").appendChild(a),console.log("登録されているノード一覧\n\n"+this.nodes),document.getElementById("MindMapDraw").appendChild(t)}},methods:{mouseDoubleClick:function(e){console.log("ダブルクリックした。データ："+e.target.id)},mouseClickUp:function(){},setLinePosition:function(e){console.log(e)}}};const be=(0,_.Z)(ve,[["render",V]]);var we=be,Te={name:"MindMap",props:{isTaskCreated:Boolean,resDatas:Object},data:()=>({}),components:{MindMapDraw:we}};const _e=(0,_.Z)(Te,[["render",F]]);var Ne=_e;const fe={class:"AccountSet"},Ce={class:"button"},De=(0,s._)("button",{class:"btn-primary"},"アカウント",-1),ye={class:"button"};function Me(e,t,a,n,i,o){const l=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",fe,[(0,s._)("div",Ce,[(0,s.Wm)(l,{to:"/signin"},{default:(0,s.w5)((()=>[De])),_:1})]),(0,s._)("div",ye,[(0,s._)("button",{onClick:t[0]||(t[0]=(...e)=>o.LogOutButton&&o.LogOutButton(...e)),class:"btn-danger"},"ログアウト")])])}var xe={name:"AccountSet",props:{},data:()=>({}),methods:{AccountButton:function(){B.Z.get("/AccountSet/account").then((e=>{alert(e.data)})).catch((e=>{alert(e)}))},LogOutButton:function(){B.Z.get("/AccountSet/logOut").then((e=>{alert(e.data)})).catch((e=>{alert(e)}))}}};const Ae=(0,_.Z)(xe,[["render",Me]]);var Ee=Ae;const Pe={class:"Calender"},Be=(0,s._)("h1",null,"カレンダー",-1),Oe=[Be];function Ie(e,t,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",Pe,Oe)}var Se={name:"calenderDate",props:{},data:()=>({})};const Ue=(0,_.Z)(Se,[["render",Ie]]);var Le=Ue;const je={class:"TaskAdd"},Fe=(0,s._)("h1",null,"タスク追加",-1),Ve={key:0,class:"black-bg"},Ze={class:"white-bg"},ze={id:"task"},Re={key:0,class:"alert alert-danger d-flex align-items-center",role:"alert"},We={key:0,xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},qe=(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"},null,-1),He=[qe],$e={key:1},Xe=(0,s._)("br",null,null,-1),Ye=(0,s._)("br",null,null,-1),Ge=(0,s._)("p",null," タスク内容(Task Contents) ",-1),Je=(0,s._)("br",null,null,-1),Ke=(0,s._)("br",null,null,-1),Qe={key:2,class:"alert alert-danger d-flex align-items-center",role:"alert"},et=(0,s._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},[(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})],-1),tt={key:3},at=(0,s._)("br",null,null,-1),nt=(0,s._)("br",null,null,-1),st=(0,s._)("p",null," 終了フラグ(complelete) ",-1);function it(e,t,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",je,[Fe,0==e.isTaskFormOpen?((0,s.wg)(),(0,s.iD)("div",Ve,[(0,s._)("div",Ze,[(0,s._)("form",ze,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("p",Re,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("svg",We,He)):(0,s.kq)("",!0),(0,s.Uk)(" タスク名(Task Name) ")])):((0,s.wg)(),(0,s.iD)("p",$e," タスク名(Task Name) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>l.inputTaskName=e),type:"text",id:"taskName",name:"task name"},null,512),[[n.nr,l.inputTaskName]]),Xe,Ye,Ge,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>l.inputTaskContent=e),type:"text",id:"taskContent",name:"task contents"},null,512),[[n.nr,l.inputTaskContent]]),Je,Ke,null==l.inputDeadLine?((0,s.wg)(),(0,s.iD)("p",Qe,[et,(0,s.Uk)(" 締め切り日(dead line) ")])):((0,s.wg)(),(0,s.iD)("p",tt," 締め切り日(dead line) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>l.inputDeadLine=e),type:"date",id:"deadLine",name:"dead line"},null,512),[[n.nr,l.inputDeadLine]]),at,nt,st,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>l.inputComplete=e),type:"checkbox",id:"complelete",name:"complelete"},null,512),[[n.e8,l.inputComplete]])]),(0,s._)("button",{onClick:t[4]||(t[4]=(...e)=>l.createTask&&l.createTask(...e))},"タスク登録(Create Task)")])])):(0,s.kq)("",!0)])}var ot={name:"TaskAdd",props:{},data:()=>({isTaskFormOpen:!1,resDatas:{},isTaskCreatedSwitch:!1,taskName:"",taskContent:"",deadline:null,complete:!1,parentId:"",childId:""}),computed:{inputTaskName:{get(){return this.taskName},set(e){this.taskName=e}},inputTaskContent:{get(){return this.taskContent},set(e){this.taskContent=e}},inputDeadLine:{get(){return this.deadline},set(e){this.deadline=e}},inputComplete:{get(){return this.complete},set(e){this.complete=e}}},methods:{toggle:function(){1==this.isTaskFormOpen?this.isTaskFormOpen=!1:this.isTaskFormOpen=!0},createTask:function(){B.Z.post("/TaskAdd/create",{title:this.taskName,contents:this.taskContent,deadline:this.deadline,complete:this.complete}).then((e=>{alert("データを登録しました。\n登録内容\nタイトル："+e.data.title+"\n内容："+e.data.contents+"\n締め切り日："+e.data.deadline+"\n達成状況："+(e.data.complelte?"達成":"未達成")),this.resDatas={id:e.data.id,title:e.data.title,contents:e.data.contents,deadline:e.data.deadline,complete:e.data.complelte,parentId:e.data.parentId,childId:e.data.childId},this.isTaskCreatedSwitch=!this.isTaskCreatedSwitch,this.$emit("createdFlag",this.isTaskCreatedSwitch),this.$emit("resDatas",this.resDatas)})).catch((e=>{alert(e)}))},clickCreateTask:function(){1==this.isTaskFormOpen?(this.createTask(),this.toggle()):this.toggle()},retrieveWithId:function(){1==this.isTaskFormOpen?(B.Z.post("/TaskAdd/retrieve",{id:this.taskName}).then((e=>{console.log(e.data.title),console.log(e.data.contents)})).catch((e=>{alert(e)})),this.toggle()):this.toggle()}}};const lt=(0,_.Z)(ot,[["render",it]]);var dt=lt,rt={name:"App",data:()=>({isTaskCreated:!1,resDatas:{}}),components:{TitleLogo:f,MenuBar:S,MindMap:Ne,AccountSet:Ee,CalenderDate:Le,TaskAdd:dt,TaskEdit:ge},methods:{sendToMindMapDraw:function(e){console.log(e+"のデータをTaskAddから受け取りました"),this.isTaskCreated=e},sendToMindMapDraw2:function(e){console.log("MindMapDrawに送るデータたち\n"+e.id+"\n"+e.title+"\n"+e.contents+"\n"+e.deadline+"\n"+e.complete+"\n"+e.parentId+"\n"+e.childId),this.resDatas=e},sendToEdit:function(e){console.log(e)}}};const ut=(0,_.Z)(rt,[["render",k]]);var ct=ut,ht=a(65),pt=(0,ht.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}}),mt=(a(7024),a(7795)),kt=a(2483);const gt={class:"hello"},vt=(0,s.uE)('<p data-v-0e59b464> For a guide and recipes on how to configure / customize this project,<br data-v-0e59b464> check out the <a href="https://cli.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vue-cli documentation</a>. </p><h3 data-v-0e59b464>Installed CLI Plugins</h3><ul data-v-0e59b464><li data-v-0e59b464><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" data-v-0e59b464>babel</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener" data-v-0e59b464>vuex</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" data-v-0e59b464>eslint</a></li></ul><h3 data-v-0e59b464>Essential Links</h3><ul data-v-0e59b464><li data-v-0e59b464><a href="https://vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>Core Docs</a></li><li data-v-0e59b464><a href="https://forum.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>Forum</a></li><li data-v-0e59b464><a href="https://chat.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>Community Chat</a></li><li data-v-0e59b464><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" data-v-0e59b464>Twitter</a></li><li data-v-0e59b464><a href="https://news.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>News</a></li></ul><h3 data-v-0e59b464>Ecosystem</h3><ul data-v-0e59b464><li data-v-0e59b464><a href="https://router.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vue-router</a></li><li data-v-0e59b464><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vuex</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" data-v-0e59b464>vue-devtools</a></li><li data-v-0e59b464><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vue-loader</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" data-v-0e59b464>awesome-vue</a></li></ul>',7);function bt(e,t,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",gt,[(0,s._)("h1",null,(0,Z.zw)(a.msg),1),vt])}var wt={name:"HelloWorld",props:{msg:String}};const Tt=(0,_.Z)(wt,[["render",bt],["__scopeId","data-v-0e59b464"]]);var _t=Tt;const Nt=(0,s._)("h1",null,"Mampuku",-1),ft=(0,s._)("h2",null,"CreateanAccount",-1),Ct=(0,s._)("label",{for:"email"},"Email:",-1),Dt=(0,s._)("label",{for:"password"},"Password:",-1),yt=(0,s._)("button",{type:"submit"},"Sign Up",-1);function Mt(e,t,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",null,[Nt,ft,(0,s._)("form",{onSubmit:t[2]||(t[2]=(0,n.iM)(((...e)=>l.signUp&&l.signUp(...e)),["prevent"]))},[(0,s._)("div",null,[Ct,(0,s.wy)((0,s._)("input",{type:"email",id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>o.email=e),required:""},null,512),[[n.nr,o.email]])]),(0,s._)("div",null,[Dt,(0,s.wy)((0,s._)("input",{type:"password",id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>o.password=e),required:""},null,512),[[n.nr,o.password]])]),yt],32)])}var xt=a(9862),At={data(){return{email:"",password:""}},methods:{signUp(){const e=(0,xt.v0)();(0,xt.Xb)(e,this.email,this.password).then((e=>{const t=e.user;console.log(t)})).catch((e=>{const t=e.code,a=e.message;"auth/email-already-in-use"===t&&alert("すでにこのアカウントは存在します"),console.log(t,a)}))}}};const Et=(0,_.Z)(At,[["render",Mt]]);var Pt=Et;const Bt=(0,s._)("h2",null,"SignIn",-1),Ot=(0,s._)("label",{for:"email"},"Email:",-1),It=(0,s._)("label",{for:"password"},"Password:",-1),St=(0,s._)("button",{type:"submit"},"Sign In",-1),Ut={key:0},Lt=(0,s._)("p",null,"ログイン済みです",-1),jt={key:1},Ft=(0,s._)("p",null,"ログインしてない",-1),Vt=[Ft];function Zt(e,t,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",null,[Bt,(0,s._)("form",{onSubmit:t[2]||(t[2]=(0,n.iM)(((...e)=>l.signIn&&l.signIn(...e)),["prevent"]))},[(0,s._)("div",null,[Ot,(0,s.wy)((0,s._)("input",{type:"email",id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>o.email=e),required:""},null,512),[[n.nr,o.email]])]),(0,s._)("div",null,[It,(0,s.wy)((0,s._)("input",{type:"password",id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>o.password=e),required:""},null,512),[[n.nr,o.password]])]),St],32),(0,s._)("button",{onClick:t[3]||(t[3]=(...e)=>l.logout&&l.logout(...e))},"logout"),(0,s._)("button",{onClick:t[4]||(t[4]=(...e)=>l.checkAccount&&l.checkAccount(...e))},"確認"),o.userMail?((0,s.wg)(),(0,s.iD)("div",Ut,[Lt,(0,s._)("p",null,(0,Z.zw)(o.userMail),1)])):((0,s.wg)(),(0,s.iD)("div",jt,Vt))])}var zt={data(){return{email:"",password:"",userMail:""}},methods:{checkAccount(){console.log("check");const e=JSON.parse(sessionStorage.getItem("currentUser"));e?(console.log("ログイン済み"),this.userMail=e.email,console.log(this.userMail)):console.log("ログインしてない")},signIn(){const e=(0,xt.v0)();(0,xt.e5)(e,this.email,this.password).then((e=>{const t=e.user;console.log(t),sessionStorage.setItem("currentUser",JSON.stringify(t))})).catch((e=>{const t=e.code,a=e.message;console.log(t,a)}))},logout(){const e=(0,xt.v0)();(0,xt.w7)(e).then((()=>{sessionStorage.removeItem("currentUser"),this.userMail=""})).catch((e=>{console.log(e)}))}}};const Rt=(0,_.Z)(zt,[["render",Zt]]);var Wt=Rt;const qt=[{path:"/",name:"home",component:_t},{path:"/signup",name:"signup",component:Pt},{path:"/signin",name:"signin",component:Wt}],Ht=(0,kt.p7)({history:(0,kt.PO)("/"),routes:qt});var $t=Ht;const Xt={apiKey:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_API_KEY,authDomain:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_AUTH_DOMAIN,projectId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_PROJECT_ID,storageBucket:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_STORAGE_BUCKET,messagingSenderId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_MESSAGING_SENDER_ID,appId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_APP_ID};(0,mt.ZF)(Xt),(0,n.ri)(ct).use($t).use(pt).mount("#app")}},t={};function a(n){var s=t[n];if(void 0!==s)return s.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,a),i.exports}a.m=e,function(){var e=[];a.O=function(t,n,s,i){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],s=e[u][1],i=e[u][2];for(var l=!0,d=0;d<n.length;d++)(!1&i||o>=i)&&Object.keys(a.O).every((function(e){return a.O[e](n[d])}))?n.splice(d--,1):(l=!1,i<o&&(o=i));if(l){e.splice(u--,1);var r=s();void 0!==r&&(t=r)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,s,i]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var s,i,o=n[0],l=n[1],d=n[2],r=0;if(o.some((function(t){return 0!==e[t]}))){for(s in l)a.o(l,s)&&(a.m[s]=l[s]);if(d)var u=d(a)}for(t&&t(n);r<o.length;r++)i=o[r],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(u)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(3795)}));n=a.O(n)})();
//# sourceMappingURL=app.44f68f39.js.map