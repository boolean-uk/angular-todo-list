import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/Ateeb020301/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/Ateeb020301/todo`, { title: title}));
    // @ts-ignore
    return todo;
  }

  async updateTodo(id: number): Promise<Todo> {   
    const todo = await firstValueFrom(this.http.get<Todo>(`${environment.apiUrl}/Ateeb020301/todo/${id}`));
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodoResponse = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/Ateeb020301/todo/${id}`, updatedTodo));
    return updatedTodoResponse;

  }
 }
