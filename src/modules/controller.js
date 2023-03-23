// import todo from './modules/todo';
import Project from './project';

export const ProjectsData=[];

const addProjectBtn=document.querySelector('.add-pro-btn');
const proBtnOverlay=document.querySelector('.add-pro-overlay');
const proSubmitBtn=document.querySelector('.pro-submit-btn');
const projectsSecion=document.querySelector('.projects-section');
const projectNameInput=document.querySelector('#project-name');

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

function addTodo (title,discription,dueDate,priority,checked);



