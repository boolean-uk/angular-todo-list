import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)
  private todoId = 1;

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get('https://boolean-uk-api-server.fly.dev/Magnus-droid/todo'));
  }
 

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post('https://boolean-uk-api-server.fly.dev/Magnus-droid/todo', 
        {
          id: this.todoId++,
          title: title,
          completed: false,
        }
      )
    );
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = await firstValueFrom(
      this.http.put(`https://boolean-uk-api-server.fly.dev/Magnus-droid/todo/${updatedTodo.id}`, updatedTodo)); 
    // @ts-ignore
    return foundTodo;
  }
}
