export default class Todo {
    constructor (title,discription,dueDate,priority) {
        this._id=randomId();
        this._title=title;
        this._checked=false;
        this._discription=discription;
        this._dueDate=dueDate;
        this._priority=priority;
    }
    set checked (value) {
        this._checked=value;
    }
    get checked () {
        return this._checked;
    }
    get id () {
        return this._id;
    }
    set title (title) {
        this._title=title;
    }
    get title () {
        return this._title;
    }
    set priority (value) {
        this._priority=value;
    }
    get priority () {
        return this._priority;
    }
    set dueDate (value) {
        this._dueDate=value;
    } 
    get dueDate () {
        return this._dueDate;
    }
}

function randomId () {
    return Math.floor(Math.random()*99) + 1;
}