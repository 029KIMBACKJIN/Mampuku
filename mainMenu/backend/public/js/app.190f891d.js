(function(){"use strict";var t={2472:function(t,e,n){var a=n(9242),s=n(3396);const o={class:"mainPage"},i={class:"left"},d={class:"Title"},r={class:"MenuBar"},l={class:"MindMap"},c={class:"right"},u={class:"Account"},h={class:"Calender"},p={class:"TaskAdd"};function m(t,e,n,a,m,k){const g=(0,s.up)("TitleLogo"),v=(0,s.up)("MenuBar"),T=(0,s.up)("MindMap"),f=(0,s.up)("AccountSet"),C=(0,s.up)("CalenderDate"),N=(0,s.up)("TaskAdd");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",i,[(0,s._)("div",d,[(0,s.Wm)(g)]),(0,s._)("div",r,[(0,s.Wm)(v)]),(0,s._)("div",l,[(0,s.Wm)(T,{isTaskCreated:t.isTaskCreated,resDatas:t.resDatas},null,8,["isTaskCreated","resDatas"])])]),(0,s._)("div",c,[(0,s._)("div",u,[(0,s.Wm)(f)]),(0,s._)("div",h,[(0,s.Wm)(C)]),(0,s._)("div",p,[(0,s.Wm)(N,{onCreatedFlag:k.sendToMindMapDraw,onResDatas:k.sendToMindMapDraw2},null,8,["onCreatedFlag","onResDatas"])])])])}const k={class:"Title"},g=(0,s._)("h1",null,"タスク管理×マインドマップ",-1),v=[g];function T(t,e,n,a,o,i){return(0,s.wg)(),(0,s.iD)("div",k,v)}var f={name:"TitleLogo",props:{},data:()=>({})},C=n(89);const N=(0,C.Z)(f,[["render",T]]);var w=N;const D={class:"menuBar"},y=(0,s._)("h1",null,"メニューバー",-1),b={class:"buttons"},x={class:"b-btn-group"},M={class:"button"},_={class:"button"},B={class:"button"};function O(t,e,n,a,o,i){return(0,s.wg)(),(0,s.iD)("div",D,[y,(0,s._)("div",b,[(0,s._)("div",x,[(0,s._)("div",M,[(0,s._)("button",{onClick:e[0]||(e[0]=(...t)=>i.HowToButton&&i.HowToButton(...t)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"使い方")]),(0,s._)("div",_,[(0,s._)("button",{onClick:e[1]||(e[1]=(...t)=>i.CriticalButton&&i.CriticalButton(...t)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"100%"}},"クリティカルパス")]),(0,s._)("div",B,[(0,s._)("button",{onClick:e[2]||(e[2]=(...t)=>i.otherButton&&i.otherButton(...t)),class:"btn btn-success",style:{width:"15%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"その他")])])])])}var A=n(191),L={name:"MenuBar",props:{isHowToButton:Boolean,isCriticalButton:Boolean},data:()=>({isBool:!1}),methods:{HowToButton:function(){A.Z.get("/MenuBar/howTo").then((t=>{console.log(t.data),alert(t.data)})).catch((t=>{alert(t)}))},CriticalButton:function(){A.Z.get("/MenuBar/criticalPass").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))},otherButton:function(){A.Z.get("/MenuBar/other").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))}}};const P=(0,C.Z)(L,[["render",O]]);var Z=P;const I={class:"MindMap"},F=(0,s._)("h1",null,"マインドマップ(ダブルクリックで生成(仮))",-1),S={class:"MindMapDrawArea"};function W(t,e,n,a,o,i){const d=(0,s.up)("MindMapDraw");return(0,s.wg)(),(0,s.iD)("div",I,[F,(0,s._)("div",S,[(0,s.Wm)(d,{isTaskCreated:n.isTaskCreated,resDatas:n.resDatas},null,8,["isTaskCreated","resDatas"])])])}function j(t,e,n,o,i,d){const r=(0,s.up)("MindMapNode");return(0,s.wg)(),(0,s.iD)("div",{id:"MindMapDraw",onDblclick:e[0]||(e[0]=t=>d.mouseDoubleClick(t))},[(0,s.wy)((0,s._)("div",null,[(0,s.Wm)(r)],512),[[a.F8,!1]])],32)}n(7658);var U=n(7139);function z(t,e,n,a,o,i){const d=(0,s.up)("ParentLine"),r=(0,s.up)("ChildLine");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(d,{x1:t.ParentNode.x,y1:t.ParentNode.y,x2:t.TaskNode.x,y2:t.TaskNode.y},null,8,["x1","y1","x2","y2"]),(0,s._)("button",{id:"circle",style:(0,U.j5)({transform:`translate(${t.TaskNode.x}px, ${t.TaskNode.y}px) scale(${t.TaskNode.scX}, ${t.TaskNode.scY})`}),onDblclick:e[0]||(e[0]=(...t)=>i.mouseDoubleClick&&i.mouseDoubleClick(...t)),onMousedown:e[1]||(e[1]=(...t)=>i.mouseClickDown&&i.mouseClickDown(...t)),onMouseup:e[2]||(e[2]=t=>i.mouseClickUp(t)),onMousemove:e[3]||(e[3]=t=>i.mouseDragging(t)),onMouseleave:e[4]||(e[4]=(...t)=>i.mouseLeave&&i.mouseLeave(...t))},(0,U.zw)(t.TaskNode.taskName),37),(0,s.Wm)(r,{x1:t.TaskNode.x,y1:t.TaskNode.y,x2:t.ChildNode.x,y2:t.ChildNode.y},null,8,["x1","y1","x2","y2"])],64)}const $={viewbox:"-300 -300 300 300",width:"300",height:"300"},H=["x1","y1","x2","y2"];function V(t,e,n,a,o,i){return(0,s.wg)(),(0,s.iD)("svg",$,[(0,s._)("line",{x1:n.x1,y1:n.y1,x2:n.x2,y2:n.y2,stroke:"black"},null,8,H)])}var Y={name:"NodeLine",props:{x1:Number,y1:Number,x2:Number,y2:Number},data:()=>({})};const E=(0,C.Z)(Y,[["render",V]]);var X=E,R={name:"MindMapNode",props:{},data:()=>({ParentNode:{node:null,x:0,y:0},TaskNode:{id:"circle",scX:2,scY:2,x:100,y:100,width:100,height:100,taskName:"タスク名",clicking:!1},ChildNode:{node:null,x:100,y:0}}),components:{ParentLine:X,ChildLine:X},methods:{mouseDoubleClick:function(){A.Z.post("/MindMap/doubleClick",{title:this.TaskNode.taskName},{params:{id:this.TaskNode.id}}).then((t=>{alert(t.data.title)})).catch((t=>{alert(t)}))},mouseClickUp:function(){this.TaskNode.clicking=!1},mouseClickDown:function(){this.TaskNode.clicking=!0},mouseDragging:function(t){this.TaskNode.clicking&&(this.TaskNode.x+=t.movementX,this.TaskNode.y+=t.movementY,null!=this.ParentNode.node&&(this.ParentNode.x=this.ParentNode.node.data.TaskNode.x,this.ParentNode.y=this.ParentNode.node.data.TaskNode.y),null!=this.ChildNode.node&&(this.ChildNode.x=this.ChildNode.node.data.TaskNode.x,this.ChildNode.y=this.ChildNode.node.data.TaskNode.y),console.log("parent(x:"+this.ParentNode.x+", y:"+this.ParentNode.y+")"),console.log("TaskNode(x:"+this.TaskNode.x+", y:"+this.TaskNode.y+")"),console.log("child(x:"+this.ChildNode.x+", y:"+this.ChildNode.y+")"))},mouseLeave:function(){this.TaskNode.clicking=!1},getTaskName:function(){return this.TaskNode.taskName}}};const q=(0,C.Z)(R,[["render",z]]);var G=q,J={name:"MindMapDraw",props:{isTaskCreated:Boolean,resDatas:Object},data:()=>({isCreateNode:!1,nodes:[]}),components:{MindMapNode:G},watch:{isTaskCreated:function(){console.log("タスクが作成されました！！！"),console.log("到着データ\n"+this.resDatas.id+"\n"+this.resDatas.title+"\n"+this.resDatas.contents+"\n"+this.resDatas.deadline+"\n"+this.resDatas.complete+"\n"+this.resDatas.parentId+"\n"+this.resDatas.childId);const t=(0,a.ri)(G),e=document.createElement("div");t.mount(e),t._instance.data.TaskNode.id=this.resDatas.id,t._instance.data.TaskNode.taskName=this.resDatas.title,t._instance.data.ParentNode.id=this.resDatas.parentId,t._instance.data.ChildNode.id=this.resDatas.childId,this.nodes.push(t._instance),this.nodes.length>=2&&(this.nodes[1].data.ParentNode.node=this.nodes[0],this.nodes[0].data.ChildNode.node=this.nodes[1],console.log("親ノードと子ノードの情報取得（仮）")),console.log("登録されているノード一覧\n\n"+this.nodes),document.getElementById("MindMapDraw").appendChild(e)}},methods:{mouseDoubleClick:function(){},mouseClickUp:function(){}}};const K=(0,C.Z)(J,[["render",j]]);var Q=K,tt={name:"MindMap",props:{isTaskCreated:Boolean,resDatas:Object},data:()=>({}),components:{MindMapDraw:Q}};const et=(0,C.Z)(tt,[["render",W]]);var nt=et;const at={class:"AccountSet"},st={class:"button"},ot={class:"button"};function it(t,e,n,a,o,i){return(0,s.wg)(),(0,s.iD)("div",at,[(0,s._)("div",st,[(0,s._)("button",{onClick:e[0]||(e[0]=(...t)=>i.AccountButton&&i.AccountButton(...t)),class:"btn btn-primary",style:{width:"45%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"アカウント")]),(0,s._)("div",ot,[(0,s._)("button",{onClick:e[1]||(e[1]=(...t)=>i.LogOutButton&&i.LogOutButton(...t)),class:"btn btn-danger",style:{width:"45%",height:"3vw","max-width":"100%","max-height":"100vw","font-size":"150%"}},"ログアウト")])])}var dt={name:"AccountSet",props:{},data:()=>({}),methods:{AccountButton:function(){A.Z.get("/AccountSet/account").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))},LogOutButton:function(){A.Z.get("/AccountSet/logOut").then((t=>{alert(t.data)})).catch((t=>{alert(t)}))}}};const rt=(0,C.Z)(dt,[["render",it]]);var lt=rt;const ct={class:"Calender"},ut=(0,s._)("h1",null,"カレンダー",-1),ht=[ut];function pt(t,e,n,a,o,i){return(0,s.wg)(),(0,s.iD)("div",ct,ht)}var mt={name:"calenderDate",props:{},data:()=>({})};const kt=(0,C.Z)(mt,[["render",pt]]);var gt=kt;const vt={class:"TaskAdd"},Tt=(0,s._)("h1",null,"タスク追加・編集",-1),ft={key:0,class:"black-bg"},Ct={class:"white-bg"},Nt={id:"task"},wt=(0,s._)("p",null,"task name",-1),Dt=(0,s._)("p",null,"task contents",-1),yt=(0,s._)("p",null,"dead line",-1),bt=(0,s._)("p",null,"complelete",-1);function xt(t,e,n,o,i,d){return(0,s.wg)(),(0,s.iD)("div",vt,[Tt,(0,s._)("button",{onClick:e[0]||(e[0]=t=>d.toggle())},"Create Task"),1==t.isTaskFormOpen?((0,s.wg)(),(0,s.iD)("div",ft,[(0,s._)("div",Ct,[(0,s._)("form",Nt,[wt,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>d.inputTaskName=t),type:"text",id:"taskName",name:"task name"},null,512),[[a.nr,d.inputTaskName]]),Dt,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>d.inputTaskContent=t),type:"text",id:"taskContent",name:"task contents"},null,512),[[a.nr,d.inputTaskContent]]),yt,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[3]||(e[3]=t=>d.inputDeadLine=t),type:"date",id:"deadLine",name:"dead line"},null,512),[[a.nr,d.inputDeadLine]]),bt,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[4]||(e[4]=t=>d.inputComplete=t),type:"checkbox",id:"complelete",name:"complelete"},null,512),[[a.e8,d.inputComplete]])]),(0,s._)("button",{onClick:e[5]||(e[5]=(...t)=>d.createTask&&d.createTask(...t))},"Create Task")])])):(0,s.kq)("",!0)])}var Mt={name:"TaskAdd",props:{},data:()=>({isTaskFormOpen:!1,resDatas:{},isTaskCreatedSwitch:!1,taskName:"",taskContent:"",deadline:null,complete:!1}),computed:{inputTaskName:{get(){return this.taskName},set(t){this.taskName=t}},inputTaskContent:{get(){return this.taskContent},set(t){this.taskContent=t}},inputDeadLine:{get(){return this.deadline},set(t){this.deadline=t}},inputComplete:{get(){return this.complete},set(t){this.complete=t}}},methods:{toggle:function(){1==this.isTaskFormOpen?this.isTaskFormOpen=!1:this.isTaskFormOpen=!0},createTask:function(){A.Z.post("/TaskAdd/create",{title:this.taskName,contents:this.taskContent,deadline:this.deadline,complete:this.complete}).then((t=>{alert("データを登録しました。\n登録内容\nタイトル："+t.data.title+"\n内容："+t.data.contents+"\n締め切り日："+t.data.deadline+"\n達成状況："+(t.data.complete?"達成":"未達成")),this.resDatas={id:t.data.id,title:t.data.title,contents:t.data.contents,deadline:t.data.deadline,complete:t.data.complelte,parentId:t.data.parentId,childId:t.data.childId},this.isTaskCreatedSwitch=!this.isTaskCreatedSwitch,this.$emit("createdFlag",this.isTaskCreatedSwitch),this.$emit("resDatas",this.resDatas)})).catch((t=>{alert(t)}))}}};const _t=(0,C.Z)(Mt,[["render",xt]]);var Bt=_t,Ot={name:"App",data:()=>({isTaskCreated:!1,resDatas:{}}),components:{TitleLogo:w,MenuBar:Z,MindMap:nt,AccountSet:lt,CalenderDate:gt,TaskAdd:Bt},methods:{sendToMindMapDraw:function(t){console.log(t+"のデータをTaskAddから受け取りました"),this.isTaskCreated=t},sendToMindMapDraw2:function(t){console.log("MindMapDrawに送るデータたち\n"+t.id+"\n"+t.title+"\n"+t.contents+"\n"+t.deadline+"\n"+t.complete+"\n"+t.parentId+"\n"+t.childId),this.resDatas=t}}};const At=(0,C.Z)(Ot,[["render",m]]);var Lt=At,Pt=n(65),Zt=(0,Pt.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}});n(7024);(0,a.ri)(Lt).use(Zt).mount("#app")}},e={};function n(a){var s=e[a];if(void 0!==s)return s.exports;var o=e[a]={exports:{}};return t[a].call(o.exports,o,o.exports,n),o.exports}n.m=t,function(){var t=[];n.O=function(e,a,s,o){if(!a){var i=1/0;for(c=0;c<t.length;c++){a=t[c][0],s=t[c][1],o=t[c][2];for(var d=!0,r=0;r<a.length;r++)(!1&o||i>=o)&&Object.keys(n.O).every((function(t){return n.O[t](a[r])}))?a.splice(r--,1):(d=!1,o<i&&(i=o));if(d){t.splice(c--,1);var l=s();void 0!==l&&(e=l)}}return e}o=o||0;for(var c=t.length;c>0&&t[c-1][2]>o;c--)t[c]=t[c-1];t[c]=[a,s,o]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var s,o,i=a[0],d=a[1],r=a[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(s in d)n.o(d,s)&&(n.m[s]=d[s]);if(r)var c=r(n)}for(e&&e(a);l<i.length;l++)o=i[l],n.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return n.O(c)},a=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(2472)}));a=n.O(a)})();
//# sourceMappingURL=app.190f891d.js.map