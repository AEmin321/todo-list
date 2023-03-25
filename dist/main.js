(()=>{"use strict";class t{constructor(t,e,o,s){this._id=Math.floor(99*Math.random())+1,this._title=t,this._checked=!1,this._discription=e,this._dueDate=o,this._priority=s}set checked(t){this._checked=t}get checked(){return this._checked}get id(){return this._id}set title(t){this._title=t}get title(){return this._title}set priority(t){this._priority=t}get priority(){return this._priority}set dueDate(t){this._dueDate=t}get dueDate(){return this._dueDate}}class e{constructor(t){this._id=Math.floor(99*Math.random())+1,this._name=t,this._todos=[]}removeTodo(t){this._todos.splice(t,1)}get name(){return this._name}set name(t){this._name=t}}const o=[],s=new e("default");o.push(s);const n=document.querySelector("body"),c=document.querySelector(".add-pro-overlay"),i=document.querySelector(".projects-section"),a=document.querySelector("#project-name"),d=document.querySelector(".add-todo-overlay"),r=document.querySelector(".todo-form"),l=document.querySelector("#project"),u=document.querySelector(".content"),h=document.querySelector(".todo-cancel-btn");function m(t){t.forEach((t=>{const e=document.createElement("div");var o;e.classList.add("todo-card"),e.dataset.id=t._id,t._checked&&e.classList.add("todo-card-checked"),e.style.borderRight="high"===(o=t._priority)?"thick solid #DF2E38":"medium"===o?"thick solid #FF6F3C":"low"===o?"thick solid #FFC93C":void 0,e.innerHTML=`\n        <p class="card-title">${t._title}</p>\n        <p class="card-duedate">${t._dueDate}</p>\n        <div class="card-btns">\n            <div class="card-edit">\n                <i class="fa-regular fa-pen-to-square fa-lg" style="color: #363636;"></i>\n            </div>\n            <div class="card-remove">\n                <i class="card-rm fa-solid fa-delete-left fa-lg" style="color: #212121;"></i>\n            </div>\n        </div>`,u.appendChild(e)}))}function p(t){const e=document.createElement("div");e.classList.add("project-title"),e.innerHTML=`\n    <div class="title">${t}</div>\n    <div class="add-todo-btn">\n        <i class="todo-btn fa-solid fa-square-plus fa-xl" style="color: #232931;"></i>\n    </div>`,u.appendChild(e)}document.querySelector(".btn"),document.querySelector("input"),p("Inbox"),n.addEventListener("click",(s=>{if(console.log(s.target),s.target.classList.contains("project-btn")&&(c.hidden=!1),s.target.classList.contains("pro-submit-btn")&&(a.validity.valid&&(c.hidden=!0,function(t){const s=new e(t);o.push(s);const n=document.createElement("div");n.classList.add("project"),n.dataset.id=s._id,n.innerHTML=`<a class="side-project"><i class="icon fa-solid fa-table-list" style="color: #232931;"></i>  ${t}</a>`,i.appendChild(n)}(a.value),function(t){const e=document.createElement("option");e.text=t,l.options.add(e),console.log(project._name)}(a.value)),console.log(o),a.value=""),s.target.classList.contains("todo-btn")&&(d.hidden=!1),s.target.classList.contains("todo-submit-btn")){s.preventDefault();const e=r.elements.title.value,n=r.elements.discription.value,c=r.elements.dueDate.value,i=r.elements.priority.value,a=r.elements.project.value;""!=e&&""!=c&&(function(e,s,n,c,i){o.forEach((o=>{if(o._name===i){const i=new t(e,s,n,c);o._todos.push(i)}}))}(e,n,c,i,a),o.forEach((t=>{a.toLowerCase().trim()===t._name.toLowerCase().trim()&&(u.textContent="",p(t._name),m(t._todos),d.hidden=!0,r.reset())})))}if(s.target.classList.contains("todo-cancel-btn")&&h.addEventListener("click",(()=>d.hidden=!0)),s.target.classList.contains("side-project")||s.target.classList.contains("project")){const t=s.target.textContent;for(let e of o)console.log(typeof e._name+"=="),t.toLowerCase().trim()===e._name.toLowerCase().trim()&&(console.log("it passed the test bro"),u.textContent="",p(t),m(e._todos))}if((s.target.classList.contains("inbox")||s.target.classList.contains("inbox-link"))&&(u.textContent="",p("Inbox"),o.forEach((t=>{m(t._todos)}))),s.target.classList.contains("card-rm")){const t=s.target.parentElement.parentElement.parentElement.dataset.id;console.log(t),o.forEach((e=>{e._todos.forEach(((o,s)=>{o._id==t&&(e.removeTodo(s),u.textContent="",p(e._name),m(e._todos))}))}))}if(s.target.classList.contains("card-title")){const t=s.target.parentElement.dataset.id,e=s.target.parentElement;o.forEach((o=>{o._todos.forEach((o=>{o._id==t&&(function(t){t._checked?t._checked&&(t.checked=!1):t.checked=!0}(o),e.classList.toggle("todo-card-checked"))}))}))}})),console.log(Date.now())})();