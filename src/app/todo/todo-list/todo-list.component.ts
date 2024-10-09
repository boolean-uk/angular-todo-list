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
  todos: Todo[] = [];
  showCompleted = false;

  constructor(private readonly todoService: TodoService) {
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) {
    this.todoService.addTodo(title);
  }

  filteredTodos(): Todo[] {
    if (this.showCompleted) {
      return this.todos;
    }
    return this.todos.filter((todo) => !todo.completed);
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }
}
