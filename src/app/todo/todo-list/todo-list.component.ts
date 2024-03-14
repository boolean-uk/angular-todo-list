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

  // Extension
  displayCompleted: boolean = false;
  todos: any = this.getFilteredTodos();


  toggleDisplayCompleted() {
    this.displayCompleted = !this.displayCompleted;
    this.getFilteredTodos();
  }

  getFilteredTodos() {
    return this.todos = this.displayCompleted ? 
      this.todoService.getTodos() : 
      this.todoService.getTodos().then(todos => todos.filter(todo => todo.completed === false));
  }
  

  // Core
  updateTodo(todo: Todo) {
    this.todoService.putTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.postTodo(title);
    this.todoService.getTodos();
  }


}
