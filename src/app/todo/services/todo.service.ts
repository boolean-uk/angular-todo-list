import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private BASE_URL = 'https://boolean-api-server.fly.dev/malimo326/todo';
  todos: Promise<Todo[]> = this.getTodos();

  private todoId = 1;
 
  // TODO: replace with a get request
 constructor(private http: HttpClient) {}

 async getTodos(): Promise<Todo[]> {
  return await firstValueFrom(this.http.get<Todo[]>(this.BASE_URL));
}
  
    // TODO: replace with a POST request
    async addTodo(title: string): Promise<Todo> {
      const todo = await firstValueFrom(
        this.http.post<Todo>(this.BASE_URL, { title })
      );
      (await this.todos).push(todo);
      return todo;
    }


    // TODO: replace with a PUT request
   async updateTodo(todo: Todo): Promise<Todo> {
    return await firstValueFrom(
      this.http.put<Todo>(`${this.BASE_URL}/${todo.id}`, todo)
    );
  }
}
