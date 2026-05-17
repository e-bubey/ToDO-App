interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  dueDate?: Date
}
class TodoList {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  addTodo(task: string, dueDate?: Date): TodoItem {
    if (!task.trim()) {
      throw new Error("Task cannot be empty");
    }

    const newTodo: TodoItem = {
      id: this.nextId++,
      task: task.trim(),
      completed: false,
      dueDate
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  completeTodo(id: number): void {
    const todo = this.findTodoById(id);
    todo.completed = true;
  }

  removeTodo(id: number): void {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    
    if (this.todos.length === initialLength) {
      throw new Error(`Todo with id ${id} not found`);
    }
  }

  listTodos(): TodoItem[] {
    return [...this.todos];
  }

  filterTodos(completed: boolean): TodoItem[] {
    return this.todos.filter(todo => todo.completed === completed);
  }

  updateTask(id: number, newTask: string): void {
    if (!newTask.trim()) {
      throw new Error("Task cannot be empty");
    }
    
    const todo = this.findTodoById(id);
    todo.task = newTask.trim();
  }

  updateDueDate(id: number, dueDate: Date): void {
    const todo = this.findTodoById(id);
    todo.dueDate = dueDate;
  }

  clearCompleted(): number {
    const completedCount = this.todos.filter(t => t.completed).length;
    this.todos = this.todos.filter(todo => !todo.completed);
    return completedCount; 
  }

  private findTodoById(id: number): TodoItem {
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

console.log(myList.listTodos())
