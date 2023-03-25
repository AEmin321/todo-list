import Todo from './todo';
import Project from './project';

export const ProjectsData=[];

const test=new Project('default');
ProjectsData.push(test);

const docBody=document.querySelector('body');
const proBtnOverlay=document.querySelector('.add-pro-overlay');
const projectsSecion=document.querySelector('.projects-section');
const projectNameInput=document.querySelector('#project-name');
const todoBtnOverlay=document.querySelector('.add-todo-overlay');
const todoForm=document.querySelector('.todo-form');
const todoOverlaySelect=document.querySelector('#project');
const contentDiv=document.querySelector('.content');
const todoOverlayCancel=document.querySelector('.todo-cancel-btn');

export default function handlingDomEvents () {
    renderContentHeader('Inbox');
    docBody.addEventListener('click',(event)=>{
        console.log (event.target);
        // add project btn overlay events
        if (event.target.classList.contains('project-btn')){
            proBtnOverlay.hidden=false;
        }
        if (event.target.classList.contains('pro-submit-btn')){
            if (projectNameInput.validity.valid) {
                proBtnOverlay.hidden=true;
                addProject(projectNameInput.value);
                updateOverlaySelect(projectNameInput.value);
            }
            console.log (ProjectsData);
            projectNameInput.value='';
        }
        
        // add todo button overlay events  --submit event
        if (event.target.classList.contains('todo-btn')) {
            todoBtnOverlay.hidden=false;
        }
        if (event.target.classList.contains('todo-submit-btn')) {
            event.preventDefault();
            const title=todoForm.elements.title.value;
            const discription=todoForm.elements.discription.value;
            const date=todoForm.elements.dueDate.value;
            const priority=todoForm.elements.priority.value;
            const project=todoForm.elements.project.value;

            if (title!='' && date!='') {
                addTodo(title,discription,date,priority,project);
                ProjectsData.forEach((pro)=>{
                    if (project.toLowerCase().trim()===pro._name.toLowerCase().trim()) {
                        contentDiv.textContent='';
                        renderContentHeader(pro._name);
                        printTodos(pro._todos);
                        todoBtnOverlay.hidden=true;
                        todoForm.reset();
                    }
                })
            } 
        }
        // cancel event
        if (event.target.classList.contains('todo-cancel-btn')) {
            todoOverlayCancel.addEventListener('click',()=>todoBtnOverlay.hidden=true)
        }

        // leftside project button events
        if (event.target.classList.contains('side-project') || event.target.classList.contains('project')) {
            const proName=event.target.textContent;
            for (let pro of ProjectsData) {
                console.log (typeof pro._name+'==');
                if (proName.toLowerCase().trim() === pro._name.toLowerCase().trim()) {
                    console.log ("it passed the test bro");
                    contentDiv.textContent='';
                    renderContentHeader(proName);
                    printTodos(pro._todos);
                }
            }
        }

        //inbox button event handler
        if (event.target.classList.contains('inbox') || event.target.classList.contains('inbox-link')) {
            contentDiv.textContent='';
            renderContentHeader('Inbox');
            ProjectsData.forEach((project)=>{
                printTodos(project._todos);
            })
        }

        //todo card remove button event
        if (event.target.classList.contains('card-rm')) {
            const getId=event.target.parentElement.parentElement.parentElement.dataset.id;
            console.log (getId);
            ProjectsData.forEach((project)=>{
                project._todos.forEach((todo,index)=>{
                    if (todo._id==getId) {
                        project.removeTodo(index);
                        contentDiv.textContent='';
                        renderContentHeader(project._name);
                        printTodos(project._todos);
                    }
                })
            })
        }

        //project card edit button event handle
        if (event.target.classList.contains('card-title')) {
            const todoCardId=event.target.parentElement.dataset.id;
            const todoCard=event.target.parentElement;
            ProjectsData.forEach((project)=>{
                project._todos.forEach((todo)=>{
                    if (todo._id==todoCardId) {
                        switchChecked(todo);
                        todoCard.classList.toggle('todo-card-checked');
                    }
                })
            })
        }
    })
}

function addProject (name) {
    const newProject=new Project(name);
    ProjectsData.push(newProject);
    const proDiv=document.createElement('div');
    proDiv.classList.add('project');
    proDiv.dataset.id=newProject._id;
    proDiv.innerHTML=`<a class="side-project"><i class="icon fa-solid fa-table-list" style="color: #232931;"></i>  ${name}</a>`;
    projectsSecion.appendChild(proDiv);
}

function printTodos (todos) {
    todos.forEach(todo=>{
        const todoCard=document.createElement('div');
        todoCard.classList.add('todo-card');
        todoCard.dataset.id=todo._id;

        if (todo._checked){
            todoCard.classList.add('todo-card-checked');
        }

        todoCard.style.borderRight=getPrioColor(todo._priority);
        todoCard.innerHTML=`
        <p class="card-title">${todo._title}</p>
        <p class="card-duedate">${todo._dueDate}</p>
        <div class="card-btns">
            <div class="card-edit">
                <i class="fa-regular fa-pen-to-square fa-lg" style="color: #363636;"></i>
            </div>
            <div class="card-remove">
                <i class="card-rm fa-solid fa-delete-left fa-lg" style="color: #212121;"></i>
            </div>
        </div>`;
        contentDiv.appendChild(todoCard);
    })
}

function addTodo (title,discription,dueDate,priority,selectedProject) {
    ProjectsData.forEach((project)=>{
        if (project._name===selectedProject) {
            const todo=new Todo(title,discription,dueDate,priority);
            project._todos.push(todo);
        }
    })
}

// updating the project names in add todo overlay
function updateOverlaySelect (projectName) {
    const option=document.createElement('option');
    option.text=projectName;
    todoOverlaySelect.options.add(option);
    console.log (project._name);  
}

//returning color based on priority
function getPrioColor (prio) {
    if (prio==='high') {
        return "thick solid #DF2E38";
    }
    else if (prio==='medium') {
        return "thick solid #FF6F3C";
    }
    else if (prio==='low') {
        return "thick solid #FFC93C";
    }
}
//rendering content header section
function renderContentHeader (contentTitle) {
    const wrapper=document.createElement('div');
    wrapper.classList.add('project-title');
    wrapper.innerHTML=`
    <div class="title">${contentTitle}</div>
    <div class="add-todo-btn">
        <i class="todo-btn fa-solid fa-square-plus fa-xl" style="color: #232931;"></i>
    </div>`;
    contentDiv.appendChild(wrapper);
}

//switching status of todo
function switchChecked (todo) {
    if (!todo._checked) {
        todo.checked=true;
    }
    else if (todo._checked) {
        todo.checked=false;
    }
}


