import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  async todos(): Promise<Todo[]> {
    return firstValueFrom(this.httpClient.get<Todo[]>(environment.apiUrl));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.httpClient.post<Todo>(environment.apiUrl, { title }));
  
    if (!todo) {
      throw new Error('Failed to create todo');
    }
    
    return todo;
  }
  

  async updateTodo(updatedTodo: Todo): Promise<Todo> {

    console.log(updatedTodo);
    

  const todo = await firstValueFrom(this.httpClient.put<Todo>(environment.apiUrl + `/${updatedTodo.id}`, {title: updatedTodo.title, completed: updatedTodo.completed})) 

    return todo;
  }
}
