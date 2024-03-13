import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
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
  http = inject(HttpClient);

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: 0,
      title: title,
      completed: false,
    };
    // @ts-ignore
    const newTodo: Todo = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/todo`, todo)
    );
    this.todoList.push(newTodo);
    return newTodo;
  }

  async updateTodo(todoToUpdate: Todo): Promise<Todo> {
    const newTodo = {
      title: todoToUpdate.title,
      completed: todoToUpdate.completed,
    };
    // @ts-ignore
    const updatedTodo: Todo = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/todo/` + todoToUpdate.id, newTodo)
    );
    if (!updatedTodo) {
      throw new Error('todo not found');
    }
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);
    return foundTodo;
  }
}
