import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
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

  private http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }

  async addTodo(title: string): Promise<Todo> {
    const newTodo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    this.http.post(`${environment.apiUrl}`, newTodo).subscribe((response) => {
      console.log('Server response: ', response);
    });

    return newTodo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> { 
    this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo)
    return updatedTodo;
  }

  async deleteTodo(deletedTodo: Todo): Promise<Todo> {
    this.http.delete<Todo>(`${environment.apiUrl}/${deletedTodo.id}`).subscribe((response) => {
      console.log('Sever response:', response)
    })
    return deletedTodo;
  }
}
