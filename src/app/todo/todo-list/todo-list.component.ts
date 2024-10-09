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
  todos$: Observable<Todo[]> = this.todoService.GetTodos();

  constructor(private readonly todoService: TodoService) {}

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todos$ = this.todoService.GetTodos();
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.todos$ = this.todoService.GetTodos();
    });
  } 
}
