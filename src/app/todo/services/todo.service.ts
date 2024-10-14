import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    console.log(environment.apiUrl)
    return this.http.get<Todo[]>(environment.apiUrl);
  }


  async addTodo(title: string) {
    this.http.post<Todo>(environment.apiUrl, {title: title}).subscribe((response) => {
      console.log('Server response', response)
    });
  }

  async updateTodo(updatedTodo: Todo) {
    this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo).subscribe((response) => {
      console.log('server response:', response);
    })
    
  }
}
