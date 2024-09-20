import { makeAutoObservable } from "mobx";

class TodoStore {
  todos = [
    {
      id: 1,
      name: "Убрать дома",
      isCompleted: false,
    },
    {
      id: 2,
      name: "Сделать уроки",
      isCompleted: true,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  generateId() {
    if (this.todos.length === 0) return 1;
    return Math.max(...this.todos.map((todo) => todo.id)) + 1;
  }

  addTodo(name: string) {
    const newTodo = {
      id: this.generateId(),
      name,
      isCompleted: false,
    };

    this.todos.push(newTodo);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleTodoCompletion(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
    }
  }

  updateTodoName(id: number, newName: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.name = newName;
    }
  }
}

const todoStore = new TodoStore();
export default todoStore;
