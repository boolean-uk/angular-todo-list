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

  // TODO replace with a get request
  //todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  public GetTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.apiUrl);
  }
  

  public addTodo(title: string): Observable<Todo> {
    // TODO: replace with a POST request
    const todo = {
      title: title,
      completed: false,
    };
    return this.http.post<Todo>(environment.apiUrl, todo);
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    return this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo)
  }
}
