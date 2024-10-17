import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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

  todos$: Observable<Todo[]> = this.GetTodos();

  // TODO replace with a get request
  public GetTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    this.http.post(`${environment.apiUrl}`, todo).subscribe((resonse) => {
      console.log('Server response', resonse);
    })
    return todo;
  }

  async updateTodo(updatedTodo: Todo) {
    // TODO: replace with a PUT request
    this.http.put(`${environment.apiUrl}` + `/${updatedTodo.id}`, updatedTodo).subscribe((response) => {
      console.log("Server response:", response);
    });
  }
}
