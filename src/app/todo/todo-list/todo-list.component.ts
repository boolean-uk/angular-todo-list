import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Todo[]> | undefined;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }

  newTodo(title: string): void {
    const newTodo: Todo = { id: 0, title, completed: false };
    this.todoService.addTodo(newTodo).subscribe(() => {
      this.todos$ = this.todoService.getTodos();
    });
  }

    updateTodo(todo: Todo): void {
      this.todoService.updateTodo(todo);
      this.todos$ = this.todoService.getTodos();
    }
}