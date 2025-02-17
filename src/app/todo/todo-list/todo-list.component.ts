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

  todos$ = new Observable<Todo[]>(); // Define todos as a observable
  filtered_todos : Todo[] = [];
  displayComplete:boolean = false;

  private updateTodosFilter(observer: Observable<Todo|Todo[]>):void {
    observer.subscribe(x => {
      this.todos$ = this.todoService.getTodos();
      this.todos$.subscribe((todos) => {
        this.filtered_todos = todos.filter(x => this.displayComplete ? true : !x.completed );
        console.log(todos);
      })
    })
  }

  ngOnInit(): void {
    this.updateTodosFilter(this.todoService.getTodos());
  }

  toggleDisplayComplete(){
    this.displayComplete =!this.displayComplete;
    this.updateTodosFilter(this.todoService.getTodos());
  }

  updateTodo(todo: Todo) {
    this.updateTodosFilter(this.todoService.updateTodo(todo));
  }

  newTodo(title: string) {
    this.updateTodosFilter(this.todoService.addTodo(title));
  }
}
