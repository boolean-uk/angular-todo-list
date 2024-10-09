import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

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
  // TODO replace with a get request
  todos: Observable<Todo[]> = this.http.get<Todo[]>(`${environment.apiUrl}`);

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.http.post(`${environment.apiUrl}`, todo).subscribe((response) => {
      console.log('Server response: ', response);
    });
    this.todoList.push(todo);

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const url = `${environment.apiUrl}/${updatedTodo.id}`;

    return new Promise((resolve) => {
      this.http.put<Todo>(url, updatedTodo).subscribe((response) => {
        const foundTodo = this.todoList.find(
          (todo) => todo.id === updatedTodo.id
        );
        if (foundTodo) {
          Object.assign(foundTodo, updatedTodo); // Update the local version
        }
        resolve(response);
      });
    });
  }
}
