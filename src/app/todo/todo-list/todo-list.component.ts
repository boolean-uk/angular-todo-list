import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  private todos: Todo[] = [];
  private hideCompleted = false;

  constructor(private readonly todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe((todo) => {
      this.todos.push(todo);
    });
    this.todoService.addTodo(title);
  }

  toggleCompleted() {
    this.hideCompleted = !this.hideCompleted;
  }

  getTodos() {
    if (this.hideCompleted) return this.todos.filter((todo) => !todo.completed);
    else return this.todos;
  }
}
