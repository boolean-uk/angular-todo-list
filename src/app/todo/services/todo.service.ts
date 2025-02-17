import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private todoSource = new Subject<Todo[]>();
  public todos = this.todoSource.asObservable();

  constructor() {
    this.getTodos();
    this.todos.subscribe(console.log);
  }


  public getTodos() {
     this.http.get<Todo[]>(`${environment.apiUrl}`, {responseType: "json"}).subscribe(t => this.todoSource.next(t));
  }
  public addTodo(todo: Todo) {
    this.http.post(`${environment.apiUrl}`, todo).subscribe(x => this.getTodos());
  }

  public updateTodo(todo: Todo): void {
    this.http
      .put(`${environment.apiUrl}/${todo.id}`, todo).subscribe(x => this.getTodos());
  }
}
