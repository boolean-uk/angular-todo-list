import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Observable<Todo[]> | null = null;
  private todoId: number = 1;
  private readonly API: string = environment.apiUrl;
  private readonly ApiGet: string = `${this.API}/${environment.user}/todo`;
  private readonly ApiDelete: string = `${this.API}/${environment.user}/todo/`;

  constructor(private readonly http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.ApiGet);
  }

  addTodo(title: string): Observable<any> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
  
    return this.http.post(this.ApiGet, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.ApiDelete + updatedTodo.id, updatedTodo);
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete(this.ApiDelete + todoId);
  }
}