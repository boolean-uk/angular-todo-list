import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient);

  public getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(environment.apiUrl + '/todo');
  }

  addTodo(title: string): Observable<Todo>{
    const todo = {
      title: title,
    };
    return this.httpClient.post<Todo>(environment.apiUrl + '/todo', todo);
  }

  async updateTodo(updatedTodo: Todo) {
    this.httpClient.put((environment.apiUrl + '/todo/' + updatedTodo.id), updatedTodo).subscribe();
  }
}
