import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Promise<Todo[]> {
    console.log(this.apiURL);
    return lastValueFrom(this.http.get<Todo[]>(this.apiURL));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = { title };
    return await lastValueFrom(this.http.post<Todo>(this.apiURL, todo));
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    return await lastValueFrom(this.http.put<Todo>(`${this.apiURL}/${updatedTodo.id}`, updatedTodo));
  }
}
