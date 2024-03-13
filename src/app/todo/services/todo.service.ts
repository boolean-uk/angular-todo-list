import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  // private todoList: Todo[] = [
  //   {
  //     id: this.todoId++,
  //     title: 'serve the app',
  //     completed: true,
  //   },
  //   {
  //     id: this.todoId++,
  //     title: 'familiarise yourself with the codebase',
  //     completed: false,
  //   },
  //   {
  //     id: this.todoId++,
  //     title: 'start talking to the api',
  //     completed: false,
  //   },
  // ];
  http = inject(HttpClient)

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/nora-hansen/todo`))
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/nora-hansen/todo`, {
      title: title,
      completed: false
    }))
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = await firstValueFrom(this.http.get(`${environment.apiUrl}/nora-hansen/todo/${updatedTodo.id}`));
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const updateTodo = await firstValueFrom(this.http.put(`${environment.apiUrl}/nora-hansen/todo/${updatedTodo.id}`, {
      title: updatedTodo.title,
      completed: updatedTodo.completed
    }))
    console.log("updated", updatedTodo)
    return updatedTodo;
  }

  // async updateTodo(updatedTodo: Todo): Promise<Todo> {
  //   // TODO: replace with a PUT request
  //   const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
  //   if (!foundTodo) {
  //     throw new Error('todo not found');
  //   }
  //   Object.assign(foundTodo, updatedTodo);

  //   return foundTodo;
  // }
}
