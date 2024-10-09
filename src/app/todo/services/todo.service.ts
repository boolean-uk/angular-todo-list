import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);


  public getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(environment.apiUrl); 
  }

  public addTodo(todo: Todo) {
    this.http.post(environment.apiUrl, todo).subscribe();
  }

  async updateTodo(updatedTodo: Todo) {
    this.http.put(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo).subscribe();
  }
}
