// import todo from './modules/todo';
import Project from './project';

export const ProjectsData=[];

const test=new Project('test');
ProjectsData.push(test);

const addProjectBtn=document.querySelector('.add-pro-btn');
const proBtnOverlay=document.querySelector('.add-pro-overlay');
const proSubmitBtn=document.querySelector('.pro-submit-btn');
const projectsSecion=document.querySelector('.projects-section');
const projectNameInput=document.querySelector('#project-name');
const todoBtnOverlay=document.querySelector('.add-todo-overlay');
const addTodoBtn=document.querySelector('.add-todo-btn');
const todoSubmitBtn=document.querySelector('.todo-submit-btn');
const todoForm=document.querySelector('.todo-form');
const todoOverlaySelect=document.querySelector('#project');

export default function handlingDom () {
    addProjectBtn.addEventListener('click',()=>{
        proBtnOverlay.hidden=false;
    })
    proSubmitBtn.addEventListener('click',()=>{
        if (projectNameInput.validity.valid) {
            proBtnOverlay.hidden=true;
            addProject(projectNameInput.value);
        }
        console.log (ProjectsData);
        projectNameInput.value='';
    })
    addTodoBtn.addEventListener('click',()=>{
        todoBtnOverlay.hidden=false;
        updateOverlaySelect();
    })
    todoSubmitBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        const title=todoForm.elements.title.value;
        const discription=todoForm.elements.discription.value;
        const date=todoForm.elements.dueDate.value;
        const priority=todoForm.elements.priority.value;
        const project=todoForm.elements.project.value;

        addTodo(title,discription,date,priority,'test');
        todoBtnOverlay.hidden=true;
        // console.log (ProjectsData);
    })
}

function addProject (name) {
    const newProject=new Project(name);
    ProjectsData.push(newProject);
    const proDiv=document.createElement('div');
    proDiv.classList.add('project');
    proDiv.dataset.id=newProject.id;
    proDiv.innerHTML=`<a><i class="icon fa-solid fa-table-list" style="color: #232931;"></i>  ${name}</a>`;
    projectsSecion.appendChild(proDiv);
}

function addTodo (title,discription,dueDate,priority,selectedProject) {
    ProjectsData.forEach((project)=>{
        if (project._name===selectedProject) {
            project.add(title,discription,dueDate,priority);
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



