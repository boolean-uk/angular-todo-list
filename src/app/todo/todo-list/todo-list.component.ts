import {Component, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {Todo} from '../models/todo';
import {Observable} from "rxjs";

@Component({
  selector: 'app-todo-list', templateUrl: './todo-list.component.html', styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Observable<Todo[]> | null = this.todoService.todos;

  constructor(private readonly todoService: TodoService) {

  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.todos = this.todoService.getTodos()
    });
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos()
  }
}
