import Todo from './todo';
import Project from './project';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
import isThisWeek from 'date-fns/isThisWeek';
import { format } from 'date-fns';

let ProjectsData=[];
console.log (localStorage.getItem('ProjectsData'));
console.log (JSON.parse(localStorage.getItem('ProjectsData')))




const docBody=document.querySelector('body');
const proBtnOverlay=document.querySelector('.add-pro-overlay');
const projectsSecion=document.querySelector('.projects-section');
const projectNameInput=document.querySelector('#project-name');
const todoBtnOverlay=document.querySelector('.add-todo-overlay');
const todoForm=document.querySelector('.todo-form');
const todoOverlaySelect=document.querySelector('#project');
const contentDiv=document.querySelector('.content');
const todoOverlayCancel=document.querySelector('.todo-cancel-btn');
const todoUpdateBtn=document.querySelector('.todo-update-btn');
const todoSubmitBtn=document.querySelector('.todo-submit-btn');
const projectSelectDiv=document.querySelector('.project-select');
const projectErrorDiv=document.querySelector('.project-error');
const todoErrorDiv=document.querySelector('.todo-error');

export default function handlingDomEvents () {
    renderContentHeader('Inbox');
    renderProjectHeader();
    
    if(localStorage.getItem('ProjectsData')==null) {
        let test=new Project('default');
        ProjectsData.push(test);
        setStorage(ProjectsData);
        printProjects();
    }
    else {
        ProjectsData=JSON.parse(localStorage.getItem('ProjectsData'));
        updateOverlaySelect();
        printProjects();
        //prints every projects todos]
        ProjectsData.forEach((project)=>{
            printTodos(project._todos);
        })
    }
    
    
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
                projectsSecion.innerHTML='';
                renderProjectHeader();
                setStorage(ProjectsData);
                printProjects();
                projectErrorDiv.textContent='';
            }
            if (!projectNameInput.checkValidity()) {
                projectErrorDiv.textContent=projectNameInput.validationMessage;
            }
            console.log (ProjectsData);
            projectNameInput.value='';
        }
        
        // add todo button overlay events  --submit event
        if (event.target.classList.contains('todo-btn')) {
            todoBtnOverlay.hidden=false;
            updateOverlaySelect();
            todoErrorDiv.textContent='';
            todoErrorDiv.textContent='';
        }
        if (event.target.classList.contains('todo-submit-btn')) {
            event.preventDefault();
            const title=todoForm.elements.title.value;
            const discription=todoForm.elements.details.value;
            const date=todoForm.elements.dueDate.value;
            const priority=todoForm.elements.priority.value;
            const project=todoForm.elements.project.value;

            if (todoForm.elements.title.checkValidity() && todoForm.elements.dueDate.checkValidity()) {
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
            if (!todoForm.elements.title.checkValidity()) {    
                todoErrorDiv.textContent=todoForm.elements.title.setCustomValidity='Please fill out title field.';
            }
            if (!todoForm.elements.dueDate.checkValidity()) {
                todoErrorDiv.textContent=todoForm.elements.dueDate.setCustomValidity='Please fill out date field properly.';
            }
        }
        // cancel event
        if (event.target.classList.contains('todo-cancel-btn')) {
            todoOverlayCancel.addEventListener('click',()=>{
                todoBtnOverlay.hidden=true;
                todoSubmitBtn.hidden=false;
                todoUpdateBtn.hidden=true;
            })
        }

        // leftside project button events
        if (event.target.classList.contains('side-project') || event.target.classList.contains('project')) {
            const proName=event.target.textContent;

            for (let pro of ProjectsData) {
                console.log (typeof pro._name+'==');
                if (proName.toLowerCase().trim() === pro._name.toLowerCase().trim()) {
                    console.log ("it passed the test");
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
                        console.log (project);
                        project._todos.splice(index,1);
                        contentDiv.textContent='';
                        renderContentHeader(project._name);
                        printTodos(project._todos);
                    }
                })
            })
            setStorage(ProjectsData);
        }

        //project card toggle check event handler
        if (event.target.classList.contains('card-title')) {
            const todoCardId=event.target.parentElement.dataset.id;
            const todoCard=event.target.parentElement;

            ProjectsData.forEach((project)=>{
                project._todos.forEach((todo)=>{
                    if (todo._id==todoCardId) {
                        switchChecked(todo);
                        todoCard.classList.toggle('todo-card-checked');
                        setStorage(ProjectsData);
                    }
                })
            })
        }

        //todo card edit overlay button event handler
        if (event.target.classList.contains('edit-card')) {
            const cardId=event.target.parentElement.parentElement.parentElement.dataset.id;

            ProjectsData.forEach((project,projectIndex)=>{
                project._todos.forEach((todo,todoIndex)=>{
                    if (todo._id==cardId) {
                        todoForm.reset();
                        todoForm.elements.title.value=todo._title;
                        todoForm.elements.details.value=todo._discription;
                        todoForm.elements.dueDate.value=todo._dueDate;
                        todoForm.elements.priority.value=todo._priority.toLowerCase();
                        todoForm.elements.project.value=project._name.toLowerCase();

                        todoForm.dataset.toIndex=todoIndex;
                        todoForm.dataset.proIndex=projectIndex;

                        todoBtnOverlay.hidden=false;     
                        todoUpdateBtn.hidden=false;  
                        todoSubmitBtn.hidden=true;
                        projectSelectDiv.hidden=true;
                    }
                })
            })
        }

        //edit form cancel button event
        if (event.target.classList.contains('todo-update-btn')) {
            event.preventDefault();
            const todoIndex=Number(event.target.parentElement.parentElement.dataset.toIndex);
            const projectIndex=Number(event.target.parentElement.parentElement.dataset.proIndex);
            const projectName=ProjectsData[projectIndex]._name;

            updateTodo(ProjectsData[projectIndex]._todos[todoIndex]);
            contentDiv.textContent='';
            renderContentHeader(projectName);
            printTodos(ProjectsData[projectIndex]._todos);
            setStorage(ProjectsData);

            todoSubmitBtn.hidden=false;
            todoUpdateBtn.hidden=true;
            todoBtnOverlay.hidden=true;
            projectSelectDiv.hidden=false;
            todoForm.reset();
        }  
        
        //remove project button event
        if (event.target.classList.contains('remove-project')) {
            const projectIndex=event.target.parentElement.parentElement.dataset.id;

            contentDiv.textContent='';
            projectsSecion.innerHTML='';

            renderContentHeader('Index');
            renderProjectHeader();

            ProjectsData.forEach((project,index)=>{
                if (project._id==projectIndex) {
                    ProjectsData.splice(index,1);
                    setStorage(ProjectsData);
                }
            })

            ProjectsData.forEach((project)=>{
                printTodos(project._todos);
            })
            printProjects();
        }

        //show todos today button event
        if (event.target.classList.contains('today')) {
            contentDiv.innerHTML='';
            renderContentHeader('Today');
            todosToday();
        }

        //show todos this week event
        if (event.target.classList.contains('week')) {
            contentDiv.innerHTML='';
            renderContentHeader('Week');
            todosThisWeek();
        }
    })
}

//Adds project to dom and array of objects
function addProject (name) {
    const newProject=new Project(name);
    ProjectsData.push(newProject);
    setStorage(ProjectsData);
}

//prints projects inside array
function printProjects () {
    ProjectsData.forEach((project,index)=>{
        const proDiv=document.createElement('div');
        proDiv.classList.add('project');
        proDiv.dataset.id=project._id;
        proDiv.innerHTML=`<a class="side-project"><i class="icon fa-solid fa-table-list" style="color: #232931;"></i>  ${project._name}<span class="remove-project"></span></a>`;
        projectsSecion.appendChild(proDiv);
    })
}

//prints content of given todo array
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
        <p class="card-duedate">${formatGivenDate(todo._dueDate)}</p>
        <div class="card-btns">
            <div class="card-edit">
                <i class="edit-card fa-regular fa-pen-to-square fa-lg" style="color: #363636;"></i>
            </div>
            <div class="card-remove">
                <i class="card-rm fa-solid fa-delete-left fa-lg" style="color: #212121;"></i>
            </div>
        </div>`;
        contentDiv.appendChild(todoCard);
    })
}

//update the values of todo
function updateTodo (todo) {
    if (todoForm.elements.title!='' || todoForm.elements.dueDate!='') {
        todo.title=todoForm.elements.title.value;
        todo.discription=todoForm.elements.details.value;
        todo.dueDate=todoForm.elements.dueDate.value;
        todo.priority=todoForm.elements.priority.value;
        setStorage(ProjectsData);
    }
}

//Adds todo to the related project todos
function addTodo (title,discription,dueDate,priority,selectedProject) {
    ProjectsData.forEach((project)=>{
        if (project._name===selectedProject) {
            const todo=new Todo(title,discription,dueDate,priority);
            project._todos.push(todo);
            setStorage(ProjectsData);
        }
    })
}

// updating the project names in add todo overlay
function updateOverlaySelect () {
    todoOverlaySelect.innerHTML='';

    for (let project of ProjectsData) {
        const option=document.createElement('option');
        option.text=project._name;
        todoOverlaySelect.options.add(option);
        console.log (project._name);  
    }
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

//rendering header content of project section
function renderProjectHeader () {
    const projectHeader=document.createElement('div');

    projectHeader.classList.add('projects');
    projectHeader.innerHTML=` <div class="pro-title">Projects</div>
    <div class="add-pro-btn">
        <i class="project-btn fa-solid fa-square-plus fa-xl" style="color: #232931;"></i>
    </div>`;

    projectsSecion.appendChild(projectHeader);
}

//showing the todos for today
function todosToday () {
    ProjectsData.forEach((project)=>{
        project._todos.forEach((todo)=>{
            const theDate=parseISO(todo._dueDate);
            console.log (theDate);
            if (isToday(theDate)) {
                printTodo(todo);
            }
        })
    })
}

//showing todos this week
function todosThisWeek () {
    ProjectsData.forEach((project)=>{
        project._todos.forEach((todo)=>{
            const theDate=parseISO(todo._dueDate);
            if (isThisWeek(theDate)){
                printTodo(todo,{ weekStartsOn: 1 });
            }
        })
    })
}

//prints single todo
function printTodo (todo) {
    const todoCard=document.createElement('div');
    todoCard.classList.add('todo-card');
    todoCard.dataset.id=todo._id;

    if (todo._checked){
        todoCard.classList.add('todo-card-checked');
    }

    todoCard.style.borderRight=getPrioColor(todo._priority);
    todoCard.innerHTML=`
    <p class="card-title">${todo._title}</p>
    <p class="card-duedate">${formatGivenDate(todo._dueDate)}</p>
    <div class="card-btns">
        <div class="card-edit">
            <i class="edit-card fa-regular fa-pen-to-square fa-lg" style="color: #363636;"></i>
        </div>
        <div class="card-remove">
            <i class="card-rm fa-solid fa-delete-left fa-lg" style="color: #212121;"></i>
        </div>
    </div>`;
    contentDiv.appendChild(todoCard);
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

//formats date to RFC 7231
function formatGivenDate (date) {
    const theDate=parseISO(date);
    return format(theDate,'MMMM dd, yyyy');
}

function setStorage (arr) {
    localStorage.setItem('ProjectsData',JSON.stringify(arr));
}



