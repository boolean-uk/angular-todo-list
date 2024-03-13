import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)
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

  async getTodo() {
    console.log(`${environment.apiUrl}${environment.gitUser}/todo`)
    const result = await firstValueFrom(this.http.get(`${environment.apiUrl}${environment.gitUser}/todo`))
    console.log(result)
    //@ts-ignore
    this.todoList = result
    return this.todoList
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}${environment.gitUser}/todo`, { title: title }))
    //@ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const putTodo = await firstValueFrom(this.http.put(`${environment.apiUrl}${environment.gitUser}/todo/${updatedTodo.id}`, { title: updatedTodo.title, completed: updatedTodo.completed }))
    //@ts-ignore
    return putTodo;
  }
}
