import { Inject, Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, Subject, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  @Inject(HttpClient) client: HttpClient = inject(HttpClient);
  private todosSource = new Subject<Todo[]>();
  public todos = this.todosSource.asObservable();
  public incompleteTodos = this.todos.pipe(map(todos => todos.filter(t => !t.completed)));

  update() {
    this.client.get<Todo[]>(environment.apiUrl, { responseType: 'json' })
      .subscribe(res => this.todosSource.next(res));
  }

  addTodo(title: string): void {
    this.client.post(environment.apiUrl, { title }).subscribe(_ => this.update());
  }

  constructor() {
    this.update();
  }

  updateTodo(updatedTodo: Todo): void {
    this.client.put(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo).subscribe(_ => this.update());
  }
}
