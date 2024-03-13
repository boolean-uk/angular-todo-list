import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showTodos = false;

  constructor(private readonly todoService: TodoService) {}
  
  todos = this.todoService.todos;
  
  //todos$: Observable<Todo[]> = this.todoService.todos;

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
  }

  toggleCompleted() {
    this.showTodos = !this.showTodos;
  }
  
}
