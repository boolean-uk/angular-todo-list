import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  hideCompleted: boolean = true;
  todos: Promise<Todo[]> = this.todoService.todos;
  showTodos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {
    this.filterCompletedTodos();
  }

  async filterCompletedTodos(): Promise<void> {
    const todos = await this.todos;
    this.hideCompleted
      ? (this.showTodos = todos.filter((t) => t.completed === false))
      : (this.showTodos = todos);
  }

  async toggleHideCompleted(): Promise<void> {
    this.hideCompleted = !this.hideCompleted;
    await this.filterCompletedTodos();
  }

  async updateTodo(todo: Todo): Promise<void> {
    await this.todoService.updateTodo(todo);
    await this.filterCompletedTodos();
  }

  async newTodo(title: string): Promise<void> {
    await this.todoService.addTodo(title);
    await this.filterCompletedTodos();
  }
}
