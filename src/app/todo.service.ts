import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}`)
    );
    return response;
  }
  async createTodo(toCreate: string) {
    const response = await firstValueFrom(
      this.http.post(`${environment.apiUrl}`, { title: toCreate })
    );
    return response;
  }
  async updateTodo(toUpdate: Todo) {
    const response = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/${toUpdate.id}`, toUpdate)
    );
    return response;
  }

  async deleteTodo(toDelete: Todo) {
    const response = await firstValueFrom(
      this.http.delete(`${environment.apiUrl}/${toDelete.id}`)
    );
    return response;
  }
}
