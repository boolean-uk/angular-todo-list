import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = environment.apiUrl
  private todoId = 1;
  constructor(private http: HttpClient) {}
  
  //todos: Observable<Todo[]> = this.http.get<Todo[]>(this.apiURL)
  // TODO replace with a get request
  public getTodoList(): Observable<Todo[]> {
    const req = this.http.get<Todo[]>(this.apiURL)
    console.log(req)
    return this.http.get<Todo[]>(this.apiURL)
  }


  public addTodo(title: string): Observable<Todo> {
    
    // TODO: replace with a POST request
    const newTodo = { title }
    return this.http.post<Todo>(this.apiURL, newTodo)
    
    
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    return this.http.put<Todo>(`${this.apiURL}/${updatedTodo.id}`, updatedTodo)
  }
}
