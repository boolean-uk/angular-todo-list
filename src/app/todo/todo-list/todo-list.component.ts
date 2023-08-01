import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos$: Observable<Todo[]> | null = this.todoService.todos$
  showCompleted = false

  constructor(private readonly todoService: TodoService) { }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe();
  }
  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
  }
}
