import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }

  public addTodo(todo: Todo) {
    this.http.post(`${environment.apiUrl}`, todo).subscribe((response: any) => {
      console.log('Server response:', response);
    });
  }

  public updateTodo(updatedTodo: Todo): void {
    this.http
      .put(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo)
      .subscribe((response: any) => {
        console.log('Server response:', response);
    });
  }
}
