import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos$: Observable<Todo[]> | null = null;
  showCompleted: Boolean = false;
  constructor(private readonly todoService: TodoService) {
    this.todos$ = this.todoService.getAllTodos();
  }

  getTodos() {
    this.todos$ = this.todoService.getAllTodos();
  }

  setShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  getFilteredTodos(todos: Todo[]): Todo[] {
    return this.showCompleted ? todos : todos.filter((todo) => !todo.completed);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title).subscribe(() => this.getTodos());
  }
}
