import Todo from './todo';
import Project from './project';

export const ProjectsData=[];

const test=new Project('test');
ProjectsData.push(test);

const docBody=document.querySelector('body');
const proBtnOverlay=document.querySelector('.add-pro-overlay');
const projectsSecion=document.querySelector('.projects-section');
const projectNameInput=document.querySelector('#project-name');
const todoBtnOverlay=document.querySelector('.add-todo-overlay');
const todoForm=document.querySelector('.todo-form');
const todoOverlaySelect=document.querySelector('#project');
const contentDiv=document.querySelector('.content');
const contentTitle=document.querySelector('.title');
const todoOverlayCancel=document.querySelector('.todo-cancel-btn');

export default function handlingDomEvents () {
    docBody.addEventListener('click',(event)=>{
        // add project btn overlay events
        if (event.target.classList.contains('project-btn')){
            proBtnOverlay.hidden=false;
        }
        if (event.target.classList.contains('pro-submit-btn')){
            if (projectNameInput.validity.valid) {
                proBtnOverlay.hidden=true;
                addProject(projectNameInput.value);
            }
            console.log (ProjectsData);
            projectNameInput.value='';
        }
        
        // add todo button overlay events  --submit event
        if (event.target.classList.contains('todo-btn')) {
            todoBtnOverlay.hidden=false;
            updateOverlaySelect();
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
                todoBtnOverlay.hidden=true;
                console.log (ProjectsData);
            } 
        }
        // cancel event
        if (event.target.classList.contains('todo-cancel-btn')) {
            todoOverlayCancel.addEventListener('click',()=>todoBtnOverlay.hidden=true)
        }

        // leftside project button events
        if (event.target.classList.contains('side-project') || event.target.classList.contains('project')) {
            const proName=event.target.textContent;
            contentTitle.textContent=proName;
            console.log (proName);
            for (let pro of ProjectsData) {
                console.log (typeof pro._name+'=='+typeof proName);
                if (proName.toLowerCase().trim() === pro._name.toLowerCase().trim()) {
                    console.log ("it passed the test bro");
                    contentDiv.textContent='';
                    printTodos(pro._todos);
                }
            }
        }

        //inbox button event handler
        if (event.target.classList.contains('inbox') || event.target.classList.contains('inbox-btn')) {
            ProjectsData.forEach((project)=>{
                printTodos(project._todos);
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
        todoCard.innerHTML=`
        <h5 class="card-title">${todo._title}</h5>
        <p class="card-duedate">${todo._dueDate}</p>
        <div class="card-btns">
            <div class="card-edit">
                <i class="fa-regular fa-pen-to-square fa-lg" style="color: #363636;"></i>
            </div>
            <div class="card-remove">
                <i class="fa-solid fa-delete-left fa-lg" style="color: #212121;"></i>
            </div>
        </div>`;
        contentDiv.appendChild(todoCard);
    })
}

function addTodo (title,discription,dueDate,priority,selectedProject) {
    ProjectsData.forEach((project)=>{
        if (project._name===selectedProject) {
            // project.add(title,discription,dueDate,priority);
            const todo=new Todo(title,discription,dueDate,priority);
            project._todos.push(todo);
            const todoCard=document.createElement('div');
            todoCard.classList.add('todo-card');
            todoCard.dataset.id=todo._id;
            console.log (getPrioColor(priority));
            todoCard.style.borderRight=getPrioColor(priority);
            todoCard.innerHTML=`
            <h5 class="card-title">${title}</h5>
            <p class="card-duedate">${dueDate}</p>
            <div class="card-btns">
                <div class="card-edit">
                    <i class="fa-regular fa-pen-to-square fa-lg" style="color: #363636;"></i>
                </div>
                <div class="card-remove">
                    <i class="fa-solid fa-delete-left fa-lg" style="color: #212121;"></i>
                </div>
            </div>`;
            contentDiv.appendChild(todoCard);
        }
    })
}

// updating the project names in add todo overlay
function updateOverlaySelect () {
    ProjectsData.forEach((project)=>{
        const option=document.createElement('option');
        option.text=project._name;
        todoOverlaySelect.options.add(option);
        console.log (project._name);
    })
}

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

