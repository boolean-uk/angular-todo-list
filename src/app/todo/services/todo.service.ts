import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-api-server.fly.dev/najemhamo/todo';

  constructor(private http: HttpClient) {}

  todos(): Promise<Todo[]> {
    try {
      return firstValueFrom(this.http.get<Todo[]>(this.apiUrl));
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  addTodo(title: string): Promise<Todo> {
    try {
      return firstValueFrom(
        this.http.post<Todo>(this.apiUrl, { title, completed: false })
      );
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  updateTodo(updatedTodo: Todo): Promise<Todo> {
    try {
      const url = `${this.apiUrl}/${updatedTodo.id}`;
      return firstValueFrom(this.http.put<Todo>(url, updatedTodo));
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }
}
