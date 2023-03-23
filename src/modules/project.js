import Todo from "./todo";

export default class Project {
    constructor (name) {
        this.id=Date.now();
        this.name=name;
        this.todos=[];
    }
    add (title,discription,dueDate,priority,checked) {
        const todo=new Todo(title,discription,dueDate,priority,checked);
        this.todos.push(todo);
    }
    // get name () {
    //     return this.name;
    // }
    // set name (value) {
    //     this.name=value;
    // }
}

function randomId () {
    return Math.floor(Math.random()*99)+1;
}