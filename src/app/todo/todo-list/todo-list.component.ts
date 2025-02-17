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
  constructor(private readonly todoService: TodoService)  {}

  // todos = this.todoService.todos;
  todos$ = new Observable<Todo[]>(); // Define todos as a observable

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos(); // Get the Observable from the service
    this.todos$.subscribe((todo) => { // Define how to handle subscribed changes
      // Start with a console.log 
      console.log(todo);
    })
  }


  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    // TODO: Fix this; We no longer update the list after adding a todo (?)...
    // this.todos = this.todoService.todos; 
  }
}
