class Project {
    constructor (name) {
        this.id=rendomId();
        this.name=name;
        this.todos=[];
    }
    get name () {
        return this.name;
    }
    set todos (todo) {
        this.todos.push(todo);
    }
    get todos () {
        return this.todos;
    }
    get id () {
        return this.id;
    }
}

function randomId () {
    return Math.floor(Math.random()*99)+1;
}

export default function createProject (name) {
    const newProject=new Project(name);
    return newProject;
} 