import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  
get todos(): Promise<Todo[]> {
  // @ts-ignore
  return firstValueFrom(this.http.get(`${environment.apiUrl}/carob16/todo`));
}

  async addTodo(title: string): Promise<Todo> {

      const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/carob16/todo`, { id: this.todoId++,
      title: title,
      completed: false,}));
      // @ts-ignore
      return todo;
    }
  

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    
  const todo = await firstValueFrom(this.http.put(`${environment.apiUrl}/carob16/todo/${Number(updatedTodo.id)}`, {
    title: updatedTodo.title,
    completed: updatedTodo.completed,}));
     
   if (!todo) {
      throw new Error('todo not found');
    }
    Object.assign(todo, updatedTodo);
// @ts-ignore
    return todo;
  }
}
