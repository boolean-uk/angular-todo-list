import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  
  constructor(private readonly http: HttpClient) {

  }
  

  addTodo(title: string): Observable<Todo> {

    const toCreate = {
      title: title,
    };
    return this.http.post<Todo>(`${environment.apiUrl}/Alexanderell/todo`, toCreate)
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/Alexanderell/todo`);
    
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/Alexanderell/todo/${todo.id}`, todo)
  }

  deleteTodoById(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Alexanderell/todo/${id}`);
  }
}
