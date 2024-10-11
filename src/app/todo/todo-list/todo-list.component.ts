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
  private hide = false;

  constructor(private readonly todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  //todos = this.todoService.todos;

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  
  newTodo(title: string): void {
    if (!title.trim()) return; 
    this.todoService.addTodo(title).subscribe({
      next: (todo) => this.todos.push(todo),
      error: (err) => console.error('Failed to add todo', err),
    });
  }

  toggleCompleted() {
    this.hideCompleted = !this.hideCompleted;
  }

  getTodos(): Todo[] {
    return this.hideCompleted
      ? this.todos.filter((todo) => !todo.completed)
      : this.todos;
  }
}

