import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  constructor(private readonly todoService: TodoService) { }
  displayComplete = false;

  todos: Todo[] = [];
  incompleteTodos: Todo[] = [];
  subs: Subscription[] = [];

  ngOnInit() {
    this.subs.push(this.todoService.todos.subscribe(t => this.todos = t));
    this.subs.push(this.todoService.incompleteTodos.subscribe(t => this.incompleteTodos = t));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) {
    this.todoService.addTodo(title);
  }

  showComplete(show: boolean) {
    this.displayComplete = show;
  }
}
