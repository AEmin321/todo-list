class Todo {
    constructor (title,discription,dueDate,priority) {
        this.id=randomId();
        this.title=title;
        this.discription=discription;
        this.dueDate=dueDate;
        this.priority=priority;
    }
    get id () {
        return this.id;
    }
    set title (title) {
        this.title=title;
    }
    get title () {
        return this.title;
    }
    set priority (value) {
        this.priority=value;
    }
    get priority () {
        return this.priority;
    }
    set dueDate (value) {
        this.dueDate=value;
    } 
    get dueDate () {
        return this.dueDate;
    }
}

function randomId () {
    return Math.floor(Math.random()*99) + 1;
}

export default function (title,discription,dueDate,priority) {
    const todo=new Todo(title,discription,dueDate,priority);
    return todo;
}