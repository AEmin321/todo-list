class Project {
    constructor (name) {
        this.id=randomId();
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
    set todos (value) {
        this.todos.push(value);
    }
    get id () {
        return this.id;
    }
    set id (value) {
        this.id=value;
    }
}

function randomId () {
    return Math.floor(Math.random()*99)+1;
}

export default function createProject (name) {
    const newProject=new Project(name);
    return newProject;
} 