import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private apiURL = 'https://boolean-uk-api-server.fly.dev/alihaiderkhannn/todo' 

  // removed the default todos which was in-memory, because I want the fetched one from api.

  

  // TODO replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  constructor(private http: HttpClient){ } //dependency injecion with constructor. Injecting HttpClient which allows us making the http request from api.


  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL)

  }

  addTodo(title: string): Observable<Todo> {       //Observable is "async".
    const Todo = { title };
    return this.http.post<Todo>(this.apiURL, Todo)

  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiURL}/${updatedTodo.id}`, updatedTodo)
  }



}

  

  

