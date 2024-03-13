import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  private apiUrl = 'https://boolean-api-server.fly.dev/sandersaether/todo'; 
  showCompletedTodos = false;
  todos: Promise<Todo[]> = this.getTodos();
  

  constructor(private http: HttpClient) {}

  async getTodos(): Promise<Todo[]> {
    return await firstValueFrom(this.http.get<Todo[]>(this.apiUrl));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post<Todo>(this.apiUrl, { title })
    );
    (await this.todos).push(todo);
    return todo;
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    return await firstValueFrom(
      this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo)
    );
  }

  toggleCompletedTodos(): void {
    this.showCompletedTodos = !this.showCompletedTodos;
  }
}
