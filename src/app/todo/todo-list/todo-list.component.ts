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
  showCompleted: boolean = false;

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    await this.loadTodos();
  }

  async ngOnInit(): Promise<void> {
    await this.loadTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    this.todos = await this.todoService.getTodos();
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  get displayTodos(): Todo[] {
    return this.showCompleted
      ? this.todos
      : this.todos.filter((todo) => !todo.completed);
  }
}
