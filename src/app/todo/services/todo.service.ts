import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-api-server.fly.dev/annsperkach/todo';
  
  async getCompletedTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(this.apiUrl)
    );
    console.log('res', response);
    return response.filter((el) => el.completed);
  }
  
  constructor(private http: HttpClient) {}

  async addTodo(title: string){
    const todo = {
      title: title,
    };
    const response = await firstValueFrom(
      this.http.post(this.apiUrl, todo)
    );
    console.log(response);
  }

  async updateTodo(updatedTodo: Todo) {
    const response = await firstValueFrom(
      this.http.put(this.apiUrl + '/' + updatedTodo.id,updatedTodo)
    );
    console.log(response);
  }

  async deleteTodo(id: number) {
    const response = await firstValueFrom(
      this.http.delete(this.apiUrl + '/' + id)
    );
    console.log(response);
  }
}