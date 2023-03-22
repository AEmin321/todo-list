import todo from './modules/todo';
import project from './modules/project';

export const ProjectsData=[];


function createProject (name) {
    ProjectsData.push(project(name));
}

function addTodo (title,discription,dueDate,priority,index) {
    ProjectsData[index].todos(todo(title,discription,dueDate,priority));
}

