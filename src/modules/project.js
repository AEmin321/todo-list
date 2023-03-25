import Todo from "./todo";

export default class Project {
    constructor (name) {
        this._id=randomId();
        this._name=name;
        this._todos=[];
    }
    removeTodo (index) {
        this._todos.splice(index,1);
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