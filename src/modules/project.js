import Todo from "./todo";

export default class Project {
    constructor (name) {
        this._id=randomId();
        this._name=name;
        this._todos=[];
    }
    add (title,discription,dueDate,priority) {
        const todo=new Todo(title,discription,dueDate,priority);
        this._todos.push(todo);
    }
    get name () {
        return this._name;
    }
    set name (value) {
        this._name=value;
    }
}

function randomId () {
    return Math.floor(Math.random()*99)+1;
}