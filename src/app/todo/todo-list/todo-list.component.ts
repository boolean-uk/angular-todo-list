import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] =  []
  showCompleted: boolean = false;

  
  constructor(private readonly todoService: TodoService) {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.fetchTodos();
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.fetchTodos();
    });
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  getFilteredTodos(): Todo[] {
    if (this.showCompleted) {
      return this.todos;
    }
    return this.todos.filter(todo => !todo.completed);
  }
}
