(()=>{"use strict";class t{constructor(t,e,o,n){this._id=Math.floor(99*Math.random())+1,this._title=t,this._checked=!1,this._discription=e,this._dueDate=o,this._priority=n}get id(){return this._id}set title(t){this._title=t}get title(){return this._title}set priority(t){this._priority=t}get priority(){return this._priority}set dueDate(t){this._dueDate=t}get dueDate(){return this._dueDate}}class o{constructor(t){this._id=Math.floor(99*Math.random())+1,this._name=t,this._todos=[]}add(e,o,n,s){const i=new t(e,o,n,s);this._todos.push(i)}get name(){return this._name}set name(t){this._name=t}}const n=[],s=new o("test");n.push(s);const i=document.querySelector("body"),c=document.querySelector(".add-pro-overlay"),a=document.querySelector(".projects-section"),d=document.querySelector("#project-name"),r=document.querySelector(".add-todo-overlay"),l=(document.querySelector(".add-todo-btn"),document.querySelector(".todo-submit-btn"),document.querySelector(".todo-form")),u=document.querySelector("#project"),h=document.querySelector(".content"),m=document.querySelector(".title"),p=document.querySelector(".todo-cancel-btn");function y(t){return"high"===t?"thick solid #DF2E38":"medium"===t?"thick solid #FF6F3C":"low"===t?"thick solid #FFC93C":void 0}document.querySelector(".btn"),document.querySelector("input"),i.addEventListener("click",(s=>{if(console.log(s.target),s.target.classList.contains("project-btn")&&(c.hidden=!1),s.target.classList.contains("pro-submit-btn")&&(d.validity.valid&&(c.hidden=!0,function(t){const e=new o(t);n.push(e);const s=document.createElement("div");s.classList.add("project"),s.dataset.id=e._id,s.innerHTML=`<a><i class="icon fa-solid fa-table-list" style="color: #232931;"></i>  ${t}</a>`,a.appendChild(s)}(d.value)),console.log(n),d.value=""),s.target.classList.contains("todo-btn")&&(r.hidden=!1,n.forEach((t=>{const e=document.createElement("option");e.text=t._name,u.options.add(e),console.log(t._name)}))),s.target.classList.contains("todo-submit-btn")){s.preventDefault();const e=l.elements.title.value,o=l.elements.discription.value,i=l.elements.dueDate.value,c=l.elements.priority.value;l.elements.project.value,""!=e&&""!=i&&(function(e,o,s,i,c){n.forEach((n=>{if("test"===n._name){const c=new t(e,o,s,i);n._todos.push(c);const a=document.createElement("div");a.classList.add("todo-card"),a.dataset.id=c._id,console.log(y(i)),a.style.borderRight=y(i),a.innerHTML=`\n            <h5 class="card-title">${e}</h5>\n            <p class="card-duedate">${s}</p>\n            <div class="card-btns">\n                <div class="card-edit">\n                    <i class="fa-regular fa-pen-to-square fa-lg" style="color: #363636;"></i>\n                </div>\n                <div class="card-remove">\n                    <i class="fa-solid fa-delete-left fa-lg" style="color: #212121;"></i>\n                </div>\n            </div>`,h.appendChild(a)}}))}(e,o,i,c),r.hidden=!0)}s.target.classList.contains("todo-cancel-btn")&&p.addEventListener("click",(()=>r.hidden=!0)),(s.target.classList.contains("side-project")||s.target.classList.contains("project"))&&(m.textContent=s.target.textContent,console.log(e.target.dataset.id))})),console.log(Date.now())})();