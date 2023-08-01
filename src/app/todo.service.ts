import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) {}

  async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}`)
    );

    console.log('res', response);

    return response;
  }
  async createTodo(toCreate: string) {

    const response = await firstValueFrom(
      this.http.post(`${environment.apiUrl}`, {title : toCreate})
    );
    
    console.log(response);
  }
  async updateTodo(toUpdate : Todo) {

    const response = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/${toUpdate.id}`, toUpdate)
    );

    console.log(response);
  }

  async deleteTodo(toDelete: Todo) {

    const response = await firstValueFrom(
      this.http.delete(`${environment.apiUrl}/${toDelete.id}`)
    );

    console.log(response);
  }
  
}

export interface Todo {
  title: string;
  id: number;
  completed: boolean;
}

