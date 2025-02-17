import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showCompleted = false
  todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {}

  async ngOnInit() {
    await this.loadTodos()
  }

  async loadTodos() {
    this.todos = await this.todoService.todos
  }

  get filteredTodos(): Todo[] {
    return this.todos.filter(todo => todo.completed === this.showCompleted)
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.loadTodos()
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted
  }
}
