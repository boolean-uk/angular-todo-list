import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] = [];
  showCompleted = false;

  async loadTodos() {
    const loadedTodos = await this.todoService.todos;
    if (this.showCompleted) {
      this.todos = await loadedTodos.filter((todo) => !todo.completed);
    } else {
      this.todos = loadedTodos;
    }
    console.log(this.todos);
  }

  ngOnInit() {
    this.loadTodos();
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.loadTodos();
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
    console.log(this.showCompleted);
    this.loadTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.loadTodos();
  }
}
