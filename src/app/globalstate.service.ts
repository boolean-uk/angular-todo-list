import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo/models/todo';

@Injectable({
  providedIn: 'root'
})
export class GlobalstateService {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();


  addTodo(todo: Todo) {
    const currentTodos = this.todos.value;
    this.todos.next([...currentTodos, todo]);
  } 
}
