(function(){var t={6574:function(t,e,a){"use strict";var n=a(9242),s=a(3396);const i={class:"mainPage"},o={class:"left"},l={class:"Title"},d={class:"MenuBar"},r={class:"MindMap"},u={class:"right"},c={class:"Account"},h={class:"Calender"},p={class:"TaskAdd"},k={class:"TaskEdit"};function m(t,e,a,n,m,g){const v=(0,s.up)("TitleLogo"),T=(0,s.up)("MenuBar"),b=(0,s.up)("MindMap"),N=(0,s.up)("AccountSet"),w=(0,s.up)("CalenderDate"),_=(0,s.up)("TaskAdd"),D=(0,s.up)("TaskEdit");return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("div",o,[(0,s._)("div",l,[(0,s.Wm)(v)]),(0,s._)("div",d,[(0,s.Wm)(T)]),(0,s._)("div",r,[(0,s.Wm)(b,{isTaskCreated:t.isTaskCreated,resDatas:t.resDatas,onIsEditFlag:g.sendFlagToEdit,onResEditDatas:g.sendDatasToEdit,isTaskEdit:t.isTaskEdit},null,8,["isTaskCreated","resDatas","onIsEditFlag","onResEditDatas","isTaskEdit"])])]),(0,s._)("div",u,[(0,s._)("div",c,[(0,s.Wm)(N)]),(0,s._)("div",h,[(0,s.Wm)(w)]),(0,s._)("div",p,[(0,s.Wm)(_,{onCreatedFlag:g.sendToMindMapDraw,onResDatas:g.sendToMindMapDraw2},null,8,["onCreatedFlag","onResDatas"])]),(0,s._)("div",k,[(0,s.Wm)(D,{onCreatedFlag:g.sendToMindMapDraw,onResDatas:g.sendToMindMapDraw2,isNodeEdit:t.isEditFlag,currentNodeDatas:t.resDatas,onEditFlag:g.sendEditToMindMapDraw,onResEditDatas:g.sendToMindMapDraw2},null,8,["onCreatedFlag","onResDatas","isNodeEdit","currentNodeDatas","onEditFlag","onResEditDatas"])])])])}const g={class:"Title"},v=(0,s._)("h1",null,"タスク管理×マインドマップ",-1),T=[v];function b(t,e,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",g,T)}var N={name:"TitleLogo",props:{},data:()=>({})},w=a(89);const _=(0,w.Z)(N,[["render",b]]);var D=_;const f={class:"menuBar"},C=(0,s._)("h1",null,"メニューバー",-1),E={class:"buttons"},y={class:"b-btn-group"},M={class:"button"},x={class:"button"},A={class:"button"};function I(t,e,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",f,[C,(0,s._)("div",E,[(0,s._)("div",y,[(0,s._)("div",M,[(0,s._)("button",{onClick:e[0]||(e[0]=(...t)=>o.HowToButton&&o.HowToButton(...t)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"使い方")]),(0,s._)("div",x,[(0,s._)("button",{onClick:e[1]||(e[1]=(...t)=>o.CriticalButton&&o.CriticalButton(...t)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"100%"}},"クリティカルパス")]),(0,s._)("div",A,[(0,s._)("button",{onClick:e[2]||(e[2]=(...t)=>o.otherButton&&o.otherButton(...t)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"その他")])])])])}var P=a(4161),B={name:"MenuBar",props:{isHowToButton:Boolean,isCriticalButton:Boolean},data:()=>({isBool:!1}),methods:{HowToButton:function(){P.Z.get("/MenuBar/howTo").then((t=>{console.log(t.data),alert(t.data)})).catch((t=>{alert(t)}))},CriticalButton:function(){P.Z.get("/MenuBar/criticalPass").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))},otherButton:function(){P.Z.get("/MenuBar/other").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))}}};const F=(0,w.Z)(B,[["render",I]]);var S=F;const O={class:"MindMap"},U=(0,s._)("h1",null,"マインドマップ",-1),L={class:"MindMapDrawArea"};function j(t,e,a,n,i,o){const l=(0,s.up)("MindMapDraw");return(0,s.wg)(),(0,s.iD)("div",O,[U,(0,s._)("div",L,[(0,s.Wm)(l,{isTaskCreated:a.isTaskCreated,resDatas:a.resDatas,onIsEditFlag:o.sendToEditFlag,onResEditDatas:o.sendToEditDatas,isTaskEdit:a.isTaskEdit},null,8,["isTaskCreated","resDatas","onIsEditFlag","onResEditDatas","isTaskEdit"])])])}function Z(t,e,a,i,o,l){const d=(0,s.up)("MindMapNode");return(0,s.wg)(),(0,s.iD)("div",{id:"MindMapDraw",style:{position:"relative"},onDblclick:e[0]||(e[0]=t=>l.mouseDoubleClick(t)),onPosition:e[1]||(e[1]=(...e)=>t.setLinePosition&&t.setLinePosition(...e))},[(0,s.wy)((0,s._)("div",null,[(0,s.Wm)(d)],512),[[n.F8,!1]])],32)}a(7658);var V=a(7139);const z=["id"];function R(t,e,a,n,i,o){return(0,s.wg)(),(0,s.iD)("button",{id:t.TaskNode.id,style:(0,V.j5)([{position:"absolute",display:"inline-block",width:"100px",height:"100px","border-radius":"50%","text-align":"center","line-height":"80px"},{transform:`translate(${t.TaskNode.x}px, ${t.TaskNode.y-t.TaskNode.drawHeight}px) scale(${t.TaskNode.scX}, ${t.TaskNode.scY})`,backgroundColor:t.TaskNode.color}]),onDblclick:e[0]||(e[0]=(...t)=>o.mouseDoubleClick&&o.mouseDoubleClick(...t)),onMousedown:e[1]||(e[1]=(...t)=>o.mouseClickDown&&o.mouseClickDown(...t)),onMouseup:e[2]||(e[2]=t=>o.mouseClickUp(t)),onMousemove:e[3]||(e[3]=t=>o.mouseDragging(t)),onMouseleave:e[4]||(e[4]=(...t)=>o.mouseLeave&&o.mouseLeave(...t))},(0,V.zw)(t.TaskNode.taskName),45,z)}const W=a(5243);var $={name:"MindMapNode",props:{},data:()=>({ParentNode:{node:null,x:0,y:0},TaskNode:{id:"circle",scX:2,scY:2,maxScX:4,maxScY:4,x:100,y:600,drawWidth:100,drawHeight:100,color:"#FFFFFF",taskName:"タスク名",clicking:!1,line1:null,line2:null,currentDate:null,intervalId:null,deadline:null},ChildNode:{node:null,x:100,y:0}}),components:{},mounted(){this.TaskNode.intervalId=setInterval(this.getCurrentDate,1e3)},methods:{mouseDoubleClick:function(){},mouseClickUp:function(){this.TaskNode.clicking=!1},mouseClickDown:function(){this.TaskNode.clicking=!0},mouseDragging:function(t){this.TaskNode.clicking&&(this.TaskNode.x+=t.movementX,this.TaskNode.y+=t.movementY,this.setPos())},mouseLeave:function(){this.TaskNode.clicking=!1},setPos:function(){null!=this.ParentNode.node&&(this.ParentNode.x=this.ParentNode.node.data.TaskNode.x,this.ParentNode.y=this.ParentNode.node.data.TaskNode.y,this.ParentNode.node.data.ChildNode.x=this.TaskNode.x,this.ParentNode.node.data.ChildNode.y=this.TaskNode.y),null!=this.ChildNode.node&&(this.ChildNode.x=this.ChildNode.node.data.TaskNode.x,this.ChildNode.y=this.ChildNode.node.data.TaskNode.y,this.ChildNode.node.data.ParentNode.x=this.TaskNode.x,this.ChildNode.node.data.ParentNode.y=this.TaskNode.y),null!=this.TaskNode.line1&&(this.TaskNode.line1.setAttribute("x1",this.TaskNode.x),this.TaskNode.line1.setAttribute("y1",this.TaskNode.y),this.TaskNode.line1.setAttribute("x2",this.ParentNode.x),this.TaskNode.line1.setAttribute("y2",this.ParentNode.y)),null!=this.TaskNode.line2&&(this.TaskNode.line2.setAttribute("x1",this.TaskNode.x),this.TaskNode.line2.setAttribute("y1",this.TaskNode.y),this.TaskNode.line2.setAttribute("x2",this.ChildNode.x),this.TaskNode.line2.setAttribute("y2",this.ChildNode.y))},getCurrentDate:function(){if(null!=this.TaskNode.currentDate?this.TaskNode.currentDate.setDate(this.TaskNode.currentDate.getDate()+1):this.TaskNode.currentDate=new Date,null!=this.TaskNode.deadline){var t=this.TaskNode.deadline.split("T")[0].split("-"),e=this.TaskNode.currentDate.getFullYear(),a=this.TaskNode.currentDate.getMonth()+1,n=this.TaskNode.currentDate.getDate(),s=W.getDays(e,a,n,parseInt(t[0]),parseInt(t[1]),parseInt(t[2])),i=this.TaskNode.color.split(""),o=i[1]+i[2],l=i[3]+i[4],d=i[5]+i[6];s>0&&(this.TaskNode.scX+=(this.TaskNode.maxScX-this.TaskNode.scX)/s,this.TaskNode.scY+=(this.TaskNode.maxScY-this.TaskNode.scY)/s,o=parseInt(o,16),l=parseInt(l,16),d=parseInt(d,16),l-=parseInt(l/s),d-=parseInt(d/s),o=o<10?"0"+o.toString(16):o.toString(16),l=l<10?"0"+l.toString(16):l.toString(16),d=d<10?"0"+d.toString(16):d.toString(16),this.TaskNode.color=i[0]+o+l+d),this.setPos(),s<=0&&(clearInterval(this.TaskNode.intervalId),alert("タスク：「"+this.TaskNode.taskName+"」が期限になりました"))}}}};const q=(0,w.Z)($,[["render",R]]);var H=q,Y={name:"MindMapDraw",props:{isTaskCreated:Boolean,isTaskEdit:Boolean,resDatas:Object,width:{type:Number,default:1e4},height:{type:Number,default:1e4}},data:()=>({isCreateNode:!1,isEditNode:!1,nodes:[]}),components:{MindMapNode:H},mounted(){console.log("ページが読み込まれました");const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("id","canvas"),t.setAttribute("width",this.width),t.setAttribute("height",this.height),t.setAttribute("viewbox","0 0 1000 1000"),t.setAttribute("style","background-color:aqua"),document.getElementById("MindMapDraw").appendChild(t),P.Z.get("/MindMap/all").then((t=>{console.log(t.data);for(var e=0;e<t.data.length;e++)this.createNode(t.data[e])})).catch((t=>{alert(t)}))},watch:{isTaskCreated:function(){console.log("タスクが作成されました！！！"),console.log("到着データ\n"+this.resDatas.id+"\n"+this.resDatas.title+"\n"+this.resDatas.contents+"\n"+this.resDatas.deadline+"\n"+this.resDatas.complete+"\n"+this.resDatas.parentId+"\n"+this.resDatas.childId),this.createNode(this.resDatas)},isTaskEdit:function(){this.nodes[this.resDatas.id-1].data.TaskNode.taskName=this.resDatas.title,this.nodes[this.resDatas.id-1].data.TaskNode.deadline=this.resDatas.deadline,console.log(this.nodes[0].data)}},methods:{mouseDoubleClick:function(t){console.log("ダブルクリックした。データ："+t.target.id),"canvas"!=t.target.id&&P.Z.post("/MindMap/doubleClick",{id:t.target.id}).then((t=>{this.isEditNode=!this.isEditNode,this.$emit("isEditFlag",this.isEditNode),this.$emit("resEditDatas",t.data)})).catch((t=>{alert(t)}))},mouseClickUp:function(){},createNode:function(t){const e=(0,n.ri)(H),a=document.createElement("div");a.setAttribute("id","node_"+this.nodes.length),e.mount(a),e._instance.data.TaskNode.id=t.id,e._instance.data.TaskNode.taskName=t.title,e._instance.data.ParentNode.id=t.parentId,e._instance.data.ChildNode.id=t.childId,e._instance.data.TaskNode.drawHeight=this.height,e._instance.data.TaskNode.deadline=t.deadline;const s=document.createElementNS("http://www.w3.org/2000/svg","line");if(s.setAttribute("id","line1"),s.setAttribute("x1",e._instance.data.TaskNode.x),s.setAttribute("y1",e._instance.data.TaskNode.y),s.setAttribute("x2",e._instance.data.ParentNode.x),s.setAttribute("y2",e._instance.data.ParentNode.y),s.setAttribute("stroke","#008080"),s.setAttribute("stroke-width",5),e._instance.data.TaskNode.line1=s,this.nodes.push(e._instance),this.nodes.length>=2){var i=this.nodes[this.nodes.length-1],o=this.nodes[t.parentId-1];i.data.ParentNode.node=o,null!=o&&(o.data.ChildNode.node=i),null!=e._instance.data.ParentNode.node&&(e._instance.data.ParentNode.node.data.TaskNode.line2=s)}document.getElementById("canvas").appendChild(s),console.log("登録されているノード一覧\n\n"+this.nodes),document.getElementById("MindMapDraw").appendChild(a)}}};const X=(0,w.Z)(Y,[["render",Z]]);var G=X,J={name:"MindMap",props:{isTaskCreated:Boolean,isTaskEdit:Boolean,resDatas:Object},data:()=>({}),components:{MindMapDraw:G},methods:{sendToEditFlag:function(t){this.$emit("isEditFlag",t)},sendToEditDatas:function(t){this.$emit("resEditDatas",t)}}};const K=(0,w.Z)(J,[["render",j]]);var Q=K;const tt={class:"AccountSet"},et={class:"button"},at=(0,s._)("button",{class:"btn-primary"},"アカウント",-1),nt={class:"button"};function st(t,e,a,n,i,o){const l=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",tt,[(0,s._)("div",et,[(0,s.Wm)(l,{to:"/signin"},{default:(0,s.w5)((()=>[at])),_:1})]),(0,s._)("div",nt,[(0,s._)("button",{onClick:e[0]||(e[0]=(...t)=>o.LogOutButton&&o.LogOutButton(...t)),class:"btn-danger"},"ログアウト")])])}var it={name:"AccountSet",props:{},data:()=>({}),methods:{AccountButton:function(){P.Z.get("/AccountSet/account").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))},LogOutButton:function(){P.Z.get("/AccountSet/logOut").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))}}};const ot=(0,w.Z)(it,[["render",st]]);var lt=ot;const dt={class:"Calender"},rt=(0,s._)("h1",null,"カレンダー",-1),ut=[rt];function ct(t,e,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",dt,ut)}var ht={name:"calenderDate",props:{},data:()=>({})};const pt=(0,w.Z)(ht,[["render",ct]]);var kt=pt;const mt={class:"TaskAdd"},gt=(0,s._)("h1",null,"タスク追加",-1),vt={key:0,class:"black-bg"},Tt={class:"white-bg"},bt={id:"task"},Nt={key:0,class:"alert alert-danger d-flex align-items-center",role:"alert"},wt={key:0,xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},_t=(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"},null,-1),Dt=[_t],ft={key:1},Ct=(0,s._)("br",null,null,-1),Et=(0,s._)("br",null,null,-1),yt=(0,s._)("p",null," タスク内容(Task Contents) ",-1),Mt=(0,s._)("br",null,null,-1),xt=(0,s._)("br",null,null,-1),At={key:2,class:"alert alert-danger d-flex align-items-center",role:"alert"},It=(0,s._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},[(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})],-1),Pt={key:3},Bt=(0,s._)("br",null,null,-1),Ft=(0,s._)("br",null,null,-1),St=(0,s._)("p",null," 終了フラグ(complelete) ",-1),Ot=(0,s._)("br",null,null,-1),Ut=(0,s._)("br",null,null,-1),Lt=(0,s._)("p",null," 親ノード(oarentNode) ",-1),jt=(0,s._)("option",{value:""},"親ノード選択",-1),Zt=[jt],Vt=(0,s._)("br",null,null,-1),zt=(0,s._)("br",null,null,-1);function Rt(t,e,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",mt,[gt,0==t.isTaskFormOpen?((0,s.wg)(),(0,s.iD)("div",vt,[(0,s._)("div",Tt,[(0,s._)("form",bt,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("p",Nt,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("svg",wt,Dt)):(0,s.kq)("",!0),(0,s.Uk)(" タスク名(Task Name) ")])):((0,s.wg)(),(0,s.iD)("p",ft," タスク名(Task Name) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>l.inputTaskName=t),type:"text",id:"taskName",name:"task name"},null,512),[[n.nr,l.inputTaskName]]),Ct,Et,yt,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>l.inputTaskContent=t),type:"text",id:"taskContent",name:"task contents"},null,512),[[n.nr,l.inputTaskContent]]),Mt,xt,null==l.inputDeadLine?((0,s.wg)(),(0,s.iD)("p",At,[It,(0,s.Uk)(" 締め切り日(dead line) ")])):((0,s.wg)(),(0,s.iD)("p",Pt," 締め切り日(dead line) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>l.inputDeadLine=t),type:"date",id:"deadLine",name:"dead line"},null,512),[[n.nr,l.inputDeadLine]]),Bt,Ft,St,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[3]||(e[3]=t=>l.inputComplete=t),type:"checkbox",id:"complelete",name:"complelete"},null,512),[[n.e8,l.inputComplete]]),Ot,Ut,Lt,(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":e[4]||(e[4]=e=>t.select=e),name:"nodes",id:"TaskNodes",onMousedown:e[5]||(e[5]=(...t)=>l.selectNodes&&l.selectNodes(...t))},Zt,544),[[n.bM,t.select]]),Vt,zt]),(0,s._)("button",{onClick:e[6]||(e[6]=(...t)=>l.createTask&&l.createTask(...t))},"タスク登録(Create Task)")])])):(0,s.kq)("",!0)])}var Wt={name:"TaskAdd",props:{},data:()=>({isTaskFormOpen:!1,resDatas:{},isTaskCreatedSwitch:!1,parentId:-1,select:"親ノード選択"}),computed:{inputTaskName:{get(){return this.taskName},set(t){this.taskName=t}},inputTaskContent:{get(){return this.taskContent},set(t){this.taskContent=t}},inputDeadLine:{get(){return this.deadline},set(t){this.deadline=t}},inputComplete:{get(){return this.complete},set(t){this.complete=t}}},watch:{select:function(){console.log(this.select),P.Z.post("/TaskAdd/findParent",{id:this.select}).then((t=>{this.parentId=t.data.id})).catch((t=>{alert(t)}))}},methods:{toggle:function(){1==this.isTaskFormOpen?this.isTaskFormOpen=!1:this.isTaskFormOpen=!0},createTask:function(){P.Z.post("/TaskAdd/create",{title:this.taskName,contents:this.taskContent,deadline:this.deadline,complete:this.complete,parentId:this.parentId,childId:-1}).then((t=>{alert("データを登録しました。\n登録内容\nタイトル："+t.data.title+"\n内容："+t.data.contents+"\n締め切り日："+t.data.deadline+"\n達成状況："+(t.data.complelte?"達成":"未達成")),this.resDatas={id:t.data.id,title:t.data.title,contents:t.data.contents,deadline:t.data.deadline,complete:t.data.complelte,parentId:t.data.parentId,childId:t.data.childId},this.isTaskCreatedSwitch=!this.isTaskCreatedSwitch,this.$emit("createdFlag",this.isTaskCreatedSwitch),this.$emit("resDatas",this.resDatas)})).catch((t=>{alert(t)}))},clickCreateTask:function(){1==this.isTaskFormOpen?(this.createTask(),this.toggle()):this.toggle()},selectNodes:function(){var t=document.getElementById("TaskNodes");while(t.children.length>1)t.removeChild(t.lastChild);P.Z.get("/TaskAdd/all").then((e=>{for(var a=0;a<e.data.length;a++){var n=document.createElement("option");n.setAttribute("value",e.data[a].id),n.text=e.data[a].title,t.appendChild(n)}})).catch((t=>{alert(t)}))},retrieveWithId:function(){1==this.isTaskFormOpen?(P.Z.post("/TaskAdd/retrieve",{id:this.taskName}).then((t=>{console.log(t.data.title),console.log(t.data.contents)})).catch((t=>{alert(t)})),this.toggle()):this.toggle()}}};const $t=(0,w.Z)(Wt,[["render",Rt]]);var qt=$t;const Ht={class:"TaskEdit"},Yt=(0,s._)("h1",null,"タスク編集",-1),Xt={key:0,class:"black-bg"},Gt={class:"white-bg"},Jt={id:"task"},Kt={key:0,class:"alert alert-danger d-flex align-items-center",role:"alert"},Qt={key:0,xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},te=(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"},null,-1),ee=[te],ae={key:1},ne=(0,s._)("br",null,null,-1),se=(0,s._)("br",null,null,-1),ie=(0,s._)("p",null," タスク内容(Task Contents) ",-1),oe=(0,s._)("br",null,null,-1),le=(0,s._)("br",null,null,-1),de={key:2,class:"alert alert-danger d-flex align-items-center",role:"alert"},re=(0,s._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-exclamation-circle-fill",viewBox:"0 0 16 16"},[(0,s._)("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})],-1),ue={key:3},ce=(0,s._)("br",null,null,-1),he=(0,s._)("br",null,null,-1),pe=(0,s._)("p",null," 終了フラグ(complelete) ",-1);function ke(t,e,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",Ht,[Yt,1==t.isTaskFormOpen?((0,s.wg)(),(0,s.iD)("div",Xt,[(0,s._)("div",Gt,[(0,s._)("form",Jt,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("p",Kt,[""==l.inputTaskName?((0,s.wg)(),(0,s.iD)("svg",Qt,ee)):(0,s.kq)("",!0),(0,s.Uk)(" タスク名(Task Name) ")])):((0,s.wg)(),(0,s.iD)("p",ae," タスク名(Task Name) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>l.inputTaskName=t),type:"text",id:"taskName",name:"task name"},null,512),[[n.nr,l.inputTaskName]]),ne,se,ie,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>l.inputTaskContent=t),type:"text",id:"taskContent",name:"task contents"},null,512),[[n.nr,l.inputTaskContent]]),oe,le,null==l.inputDeadLine?((0,s.wg)(),(0,s.iD)("p",de,[re,(0,s.Uk)(" 締め切り日(dead line) ")])):((0,s.wg)(),(0,s.iD)("p",ue," 締め切り日(dead line) ")),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>l.inputDeadLine=t),type:"date",id:"deadLine",name:"dead line"},null,512),[[n.nr,l.inputDeadLine]]),ce,he,pe,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[3]||(e[3]=t=>l.inputComplete=t),type:"checkbox",id:"complelete",name:"complelete"},null,512),[[n.e8,l.inputComplete]])]),(0,s._)("button",{onClick:e[4]||(e[4]=(...t)=>l.createTask&&l.createTask(...t))},"タスク登録(Edit Task)")])])):(0,s.kq)("",!0)])}var me={name:"TaskEdit",props:{isNodeClicked:Boolean,isNodeEdit:Boolean,currentNodeDatas:Object},data:()=>({isTaskFormOpen:!1,resDatas:{},isTaskEditSwitch:!1,taskName:"",taskContent:"",deadline:null,complete:!1}),computed:{inputTaskName:{get(){return this.taskName},set(t){this.taskName=t}},inputTaskContent:{get(){return this.taskContent},set(t){this.taskContent=t}},inputDeadLine:{get(){return this.deadline},set(t){this.deadline=t}},inputComplete:{get(){return this.complete},set(t){this.complete=t}}},watch:{isNodeEdit:function(){var t=this.currentNodeDatas;this.inputTaskName=t.title,this.inputTaskContent=t.contents,this.inputDeadLine=t.deadline.split("T")[0],this.inputComplete=t.complelte,this.isTaskFormOpen=!0}},methods:{toggle:function(){1==this.isTaskFormOpen?this.isTaskFormOpen=!1:this.isTaskFormOpen=!0},createTask:function(){var t=this.currentNodeDatas;P.Z.post("/TaskEdit/update",{id:t.id,title:this.inputTaskName,contents:this.inputTaskContent,deadline:this.inputDeadLine,complete:this.inputComplete,parentId:t.parentId,childId:t.childId}).then((t=>{alert("データを変更しました。\n変更内容\nタイトル："+t.data.title+"\n内容："+t.data.contents+"\n締め切り日："+t.data.deadline+"\n達成状況："+(t.data.complete?"達成":"未達成")),this.resDatas={id:t.data.id,title:t.data.title,contents:t.data.contents,deadline:t.data.deadline,complete:t.data.complelte,parentId:t.data.parentId,childId:t.data.childId},this.isTaskEditSwitch=!this.isTaskEditSwitch,this.$emit("editFlag",this.isTaskEditSwitch),this.$emit("resEditDatas",this.resDatas),this.taskName="",this.taskContent="",this.deadline=null,this.complete=!1,this.isTaskFormOpen=!1})).catch((t=>{alert(t)}))},clickCreateTask:function(){1==this.isTaskFormOpen?(this.createTask(),this.toggle()):this.toggle()},mouseDoubleClick:function(t){console.log("ダブルクリックした。データ："+t.target.id)}}};const ge=(0,w.Z)(me,[["render",ke]]);var ve=ge,Te={name:"App",data:()=>({isTaskCreated:!1,isEditFlag:!1,isTaskEdit:!1,resDatas:{}}),components:{TitleLogo:D,MenuBar:S,MindMap:Q,AccountSet:lt,CalenderDate:kt,TaskAdd:qt,TaskEdit:ve},methods:{sendToMindMapDraw:function(t){console.log(t+"のデータをTaskAddから受け取りました"),this.isTaskCreated=t},sendEditToMindMapDraw:function(t){console.log(t+"のデータをTaskEditから受け取りました"),this.isTaskEdit=t},sendToMindMapDraw2:function(t){console.log("MindMapDrawに送るデータたち\n"+t.id+"\n"+t.title+"\n"+t.contents+"\n"+t.deadline+"\n"+t.complete+"\n"+t.parentId+"\n"+t.childId),this.resDatas=t},sendFlagToEdit:function(t){this.isEditFlag=t},sendDatasToEdit:function(t){this.resDatas=t}}};const be=(0,w.Z)(Te,[["render",m]]);var Ne=be,we=a(65),_e=(0,we.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}}),De=(a(7024),a(7795)),fe=a(2483);const Ce={class:"hello"},Ee=(0,s.uE)('<p data-v-0e59b464> For a guide and recipes on how to configure / customize this project,<br data-v-0e59b464> check out the <a href="https://cli.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vue-cli documentation</a>. </p><h3 data-v-0e59b464>Installed CLI Plugins</h3><ul data-v-0e59b464><li data-v-0e59b464><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" data-v-0e59b464>babel</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener" data-v-0e59b464>vuex</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" data-v-0e59b464>eslint</a></li></ul><h3 data-v-0e59b464>Essential Links</h3><ul data-v-0e59b464><li data-v-0e59b464><a href="https://vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>Core Docs</a></li><li data-v-0e59b464><a href="https://forum.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>Forum</a></li><li data-v-0e59b464><a href="https://chat.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>Community Chat</a></li><li data-v-0e59b464><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" data-v-0e59b464>Twitter</a></li><li data-v-0e59b464><a href="https://news.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>News</a></li></ul><h3 data-v-0e59b464>Ecosystem</h3><ul data-v-0e59b464><li data-v-0e59b464><a href="https://router.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vue-router</a></li><li data-v-0e59b464><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vuex</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" data-v-0e59b464>vue-devtools</a></li><li data-v-0e59b464><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" data-v-0e59b464>vue-loader</a></li><li data-v-0e59b464><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" data-v-0e59b464>awesome-vue</a></li></ul>',7);function ye(t,e,a,n,i,o){return(0,s.wg)(),(0,s.iD)("div",Ce,[(0,s._)("h1",null,(0,V.zw)(a.msg),1),Ee])}var Me={name:"HelloWorld",props:{msg:String}};const xe=(0,w.Z)(Me,[["render",ye],["__scopeId","data-v-0e59b464"]]);var Ae=xe;const Ie=(0,s._)("h1",null,"Mampuku",-1),Pe=(0,s._)("h2",null,"CreateanAccount",-1),Be=(0,s._)("label",{for:"email"},"Email:",-1),Fe=(0,s._)("label",{for:"password"},"Password:",-1),Se=(0,s._)("button",{type:"submit"},"Sign Up",-1);function Oe(t,e,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",null,[Ie,Pe,(0,s._)("form",{onSubmit:e[2]||(e[2]=(0,n.iM)(((...t)=>l.signUp&&l.signUp(...t)),["prevent"]))},[(0,s._)("div",null,[Be,(0,s.wy)((0,s._)("input",{type:"email",id:"email","onUpdate:modelValue":e[0]||(e[0]=t=>o.email=t),required:""},null,512),[[n.nr,o.email]])]),(0,s._)("div",null,[Fe,(0,s.wy)((0,s._)("input",{type:"password",id:"password","onUpdate:modelValue":e[1]||(e[1]=t=>o.password=t),required:""},null,512),[[n.nr,o.password]])]),Se],32)])}var Ue=a(9862),Le={data(){return{email:"",password:""}},methods:{signUp(){const t=(0,Ue.v0)();(0,Ue.Xb)(t,this.email,this.password).then((t=>{const e=t.user;console.log(e)})).catch((t=>{const e=t.code,a=t.message;"auth/email-already-in-use"===e&&alert("すでにこのアカウントは存在します"),console.log(e,a)}))}}};const je=(0,w.Z)(Le,[["render",Oe]]);var Ze=je;const Ve=(0,s._)("h2",null,"SignIn",-1),ze=(0,s._)("label",{for:"email"},"Email:",-1),Re=(0,s._)("label",{for:"password"},"Password:",-1),We=(0,s._)("button",{type:"submit"},"Sign In",-1),$e={key:0},qe=(0,s._)("p",null,"ログイン済みです",-1),He={key:1},Ye=(0,s._)("p",null,"ログインしてない",-1),Xe=[Ye];function Ge(t,e,a,i,o,l){return(0,s.wg)(),(0,s.iD)("div",null,[Ve,(0,s._)("form",{onSubmit:e[2]||(e[2]=(0,n.iM)(((...t)=>l.signIn&&l.signIn(...t)),["prevent"]))},[(0,s._)("div",null,[ze,(0,s.wy)((0,s._)("input",{type:"email",id:"email","onUpdate:modelValue":e[0]||(e[0]=t=>o.email=t),required:""},null,512),[[n.nr,o.email]])]),(0,s._)("div",null,[Re,(0,s.wy)((0,s._)("input",{type:"password",id:"password","onUpdate:modelValue":e[1]||(e[1]=t=>o.password=t),required:""},null,512),[[n.nr,o.password]])]),We],32),(0,s._)("button",{onClick:e[3]||(e[3]=(...t)=>l.logout&&l.logout(...t))},"logout"),(0,s._)("button",{onClick:e[4]||(e[4]=(...t)=>l.checkAccount&&l.checkAccount(...t))},"確認"),o.userMail?((0,s.wg)(),(0,s.iD)("div",$e,[qe,(0,s._)("p",null,(0,V.zw)(o.userMail),1)])):((0,s.wg)(),(0,s.iD)("div",He,Xe))])}var Je={data(){return{email:"",password:"",userMail:""}},methods:{checkAccount(){console.log("check");const t=JSON.parse(sessionStorage.getItem("currentUser"));t?(console.log("ログイン済み"),this.userMail=t.email,console.log(this.userMail)):console.log("ログインしてない")},signIn(){const t=(0,Ue.v0)();(0,Ue.e5)(t,this.email,this.password).then((t=>{const e=t.user;console.log(e),sessionStorage.setItem("currentUser",JSON.stringify(e))})).catch((t=>{const e=t.code,a=t.message;console.log(e,a)}))},logout(){const t=(0,Ue.v0)();(0,Ue.w7)(t).then((()=>{sessionStorage.removeItem("currentUser"),this.userMail=""})).catch((t=>{console.log(t)}))}}};const Ke=(0,w.Z)(Je,[["render",Ge]]);var Qe=Ke;const ta=[{path:"/",name:"home",component:Ae},{path:"/signup",name:"signup",component:Ze},{path:"/signin",name:"signin",component:Qe}],ea=(0,fe.p7)({history:(0,fe.PO)("/"),routes:ta});var aa=ea;const na={apiKey:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_API_KEY,authDomain:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_AUTH_DOMAIN,projectId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_PROJECT_ID,storageBucket:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_STORAGE_BUCKET,messagingSenderId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_MESSAGING_SENDER_ID,appId:{NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_APP_ID};(0,De.ZF)(na),(0,n.ri)(Ne).use(aa).use(_e).mount("#app")},5243:function(t,e){function a(t,e){switch(e){case 1:return 31;case 2:return t%4==0?29:28;case 3:return 31;case 4:return 30;case 5:return 31;case 6:return 30;case 7:return 31;case 8:return 31;case 9:return 30;case 10:return 31;case 11:return 30;case 12:return 31;default:return-1}}function n(t){return t%4==0?366:365}e.getDays=(t,e,s,i,o,l)=>{var d=i-t,r=0;if(d>0){for(var u=e;u<=12;u++)r+=a(t,u);for(r-=s,u=t+1;u<i-1;u++)r+=n(u);for(u=1;u<o;u++)r+=a(i,u);r+=l}else{for(var c=e;c<o;c++)r+=a(t,c);r=r-s+l}return r}}},e={};function a(n){var s=e[n];if(void 0!==s)return s.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,a),i.exports}a.m=t,function(){var t=[];a.O=function(e,n,s,i){if(!n){var o=1/0;for(u=0;u<t.length;u++){n=t[u][0],s=t[u][1],i=t[u][2];for(var l=!0,d=0;d<n.length;d++)(!1&i||o>=i)&&Object.keys(a.O).every((function(t){return a.O[t](n[d])}))?n.splice(d--,1):(l=!1,i<o&&(o=i));if(l){t.splice(u--,1);var r=s();void 0!==r&&(e=r)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[n,s,i]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,n){var s,i,o=n[0],l=n[1],d=n[2],r=0;if(o.some((function(e){return 0!==t[e]}))){for(s in l)a.o(l,s)&&(a.m[s]=l[s]);if(d)var u=d(a)}for(e&&e(n);r<o.length;r++)i=o[r],a.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return a.O(u)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(6574)}));n=a.O(n)})();
//# sourceMappingURL=app.19a590e8.js.map