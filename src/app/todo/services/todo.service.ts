import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;

  private apiURL = environment.apiUrl + "MalteStengard/todo"

  constructor(private http: HttpClient) {
    console.log(this.apiURL)
  }

  // TODO replace with a get request
  getData(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

  addTodo(title: string): Observable<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    console.log(todo)
    return this.http.post<Todo>(this.apiURL, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    console.log(updatedTodo)
    const url = `${this.apiURL}/${updatedTodo.id}`;
    console.log(url)
    return this.http.put<Todo>(url, updatedTodo);
  }
}
