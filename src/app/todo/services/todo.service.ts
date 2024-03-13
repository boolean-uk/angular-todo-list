import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)
  private todoId = 1;
  private todos: Todo[] = []

  // TODO replace with a get request
  async getTodos() : Promise<Todo[]>{
    const result = await firstValueFrom(this.http.get(`${environment.apiUrl}/ThomasKvam/todo`))
    //@ts-ignore
    this.todos = result
    console.log(this.todos)
    return this.todos
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/ThomasKvam/todo`, {title: title, completed: false}))
    //@ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id)
    await firstValueFrom(this.http.put(`${environment.apiUrl}/ThomasKvam/todo/${updatedTodo.id}`, updatedTodo))
    this.todos[index] = updatedTodo
    return updatedTodo;
  }
}
