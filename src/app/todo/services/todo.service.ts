import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, ignoreElements } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}


  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
  }
  
  // async getTodos() : Promise<Todo[]> {
  //   // @ts-ignore
  //   return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`))
  // }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/todo`, {
      title: title
    }))
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const updatedTodoResponse = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/todo/${updatedTodo.id}`, updatedTodo)
    );
    // @ts-ignore
    return updatedTodoResponse;
  }
}
