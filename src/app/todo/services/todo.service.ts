import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  http = inject(HttpClient);
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get<Todo[]>(`${environment.apiUrl}`,  {headers: {'Content-Type': 'application/json' }}));
  }

  async addTodo(title: string): Promise<Todo> {
    
    const todo = await firstValueFrom(this.http.post<Todo>(`${environment.apiUrl}`, { title: title, completed: false}, {headers: {'Content-Type': 'application/json' }}));
    console.log(todo);

    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo, {headers: {'Content-Type': 'application/json' }}));
    // @ts-ignore
    return todo;
  }

  
}
