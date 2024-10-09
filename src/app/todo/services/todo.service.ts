import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
    private httpClient = inject(HttpClient);
    private API = 'https://boolean-api-server.fly.dev/'
    private USERNAME = 'alkolbodo/'
    private APIURL = this.API + this.USERNAME

 

  /*
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
  */

  // TODO replace with a get request
  todos: Promise<Todo[]> = this.getTodos();

  async getTodos(): Promise<Todo[]> {
    const response = this.httpClient.get<Todo[]>(this.APIURL + 'todo');
    const todos = await firstValueFrom(response);
    console.log(todos)
    return todos;
  }

  async addTodo(title: string): Promise<Todo> {
    const response = this.httpClient.post<Todo>(this.APIURL + 'todo', {
      title: title,
    })
    const todo = await firstValueFrom(response);
    (await this.todos).push(todo);
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const response = this.httpClient.put<Todo>(this.APIURL + `todo/${updatedTodo.id}`, updatedTodo );
    const todo = await firstValueFrom(response);
    const existingTodo = (await this.todos).find((x: Todo) => x.id === updatedTodo.id)
    if (!existingTodo) throw new Error('No todo with this id  ')
    existingTodo.completed = todo.completed;
    existingTodo.title = todo.title;
    return todo;
  }
}

