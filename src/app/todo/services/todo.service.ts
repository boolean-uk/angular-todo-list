import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  http = inject(HttpClient)


  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/noahlenn/todo`));
  }


  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/noahlenn/todo`, {title: title}))
    // @ts-ignore

    return todo
  }

  async updateTodo(id: number): Promise<Todo> {  
    const todo = await firstValueFrom(this.http.get<Todo>(`${environment.apiUrl}/noahlenn/todo/${id}`));
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodoResponse = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/noahlenn/todo/${id}`, updatedTodo));

    return updatedTodoResponse;

  } 
}
