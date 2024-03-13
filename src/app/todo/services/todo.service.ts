import { ApplicationRef, Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private URL = "https://boolean-api-server.fly.dev/henrikrosenkilde/todo"
  todos: any;
  http = inject(HttpClient)

  constructor(private appRef: ApplicationRef) {
    this.todos = this.getTodos();
  }

  async getTodos() {
    const result = await firstValueFrom(this.http.get(`${this.URL}`));
    // @ts-ignore
    this.todos = result;
    return this.todos;
  }

  async addTodo(title: string) {
    const request = this.http.post<Todo>(this.URL, { title: title });
    const response = await firstValueFrom(request);
    this.todos.push(response)
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const request = this.http.put<Todo>(this.URL + "/" + updatedTodo.id, 
    { 
      title: updatedTodo.title, 
      completed: updatedTodo.completed 
    });
    const foundTodo = firstValueFrom(request)
    if (!foundTodo) 
    {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);
    return foundTodo;
  }
}
