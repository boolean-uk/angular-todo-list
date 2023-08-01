import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly apiURL = environment.apiUrl;
  private todoId = 1;
  todos: Observable<Todo[]> | null = null;

  constructor(private http: HttpClient) {}

  async getTodos(): Promise<Todo[]> {
    let response;
    try {
      response = await this.http.get<Todo[]>(this.apiURL).toPromise();
    } catch (error) {
      console.log('error in getTodos', error);
    }
    return response || [];
  }

  async addTodo(title: string) {
    const todo: Todo = {
      id: 69,
      title: title,
      completed: false,
    };
    try {
      const response = await this.http
        .post<Todo>(this.apiURL, todo)
        .toPromise();

      if (!response) {
        throw new Error('Failed to add todo');
      }
    } catch (e) {
      console.error('Error adding todo:', e);
    }
  }

  async updateTodo(updatedTodo: Todo) {
    try {
      const response = await this.http
        .put<Todo>(this.apiURL + '/' + updatedTodo.id, updatedTodo)
        .toPromise();

      if (!response) {
        throw new Error('Failed to update todo');
      }

      console.log('Updated todo:', response);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async deleteTodo(todo: Todo) {
    try {
      const response = await this.http
        .delete<Todo>(this.apiURL + '/' + todo.id)
        .toPromise();

      if (!response) {
        throw new Error('Failed to delete todo');
      }
      console.log('Deleted todo:', response);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
}
