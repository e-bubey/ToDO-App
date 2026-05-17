"use strict";
class TodoList {
    todos = [];
    nextId = 1;
    addTodo(task, dueDate) {
        if (!task.trim()) {
            throw new Error("Task cannot be empty");
        }
        const newTodo = {
            id: this.nextId++,
            task: task.trim(),
            completed: false,
            dueDate
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    completeTodo(id) {
        const todo = this.findTodoById(id);
        todo.completed = true;
    }
    removeTodo(id) {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => todo.id !== id);
        if (this.todos.length === initialLength) {
            throw new Error(`Todo with id ${id} not found`);
        }
    }
    listTodos() {
        return [...this.todos];
    }
    filterTodos(completed) {
        return this.todos.filter(todo => todo.completed === completed);
    }
    updateTask(id, newTask) {
        if (!newTask.trim()) {
            throw new Error("Task cannot be empty");
        }
        const todo = this.findTodoById(id);
        todo.task = newTask.trim();
    }
    updateDueDate(id, dueDate) {
        const todo = this.findTodoById(id);
        todo.dueDate = dueDate;
    }
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        this.todos = this.todos.filter(todo => !todo.completed);
        return completedCount;
    }
    findTodoById(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return todo;
    }
}
// Testing the TodoList
const myList = new TodoList();
myList.addTodo("Learn Typescript");
myList.addTodo("Do Task");
console.log(myList.listTodos());
