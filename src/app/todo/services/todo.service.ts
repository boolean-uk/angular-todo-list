import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  
  private todoId = 1;
  private todoList: Todo[] = [];

  http = inject(HttpClient)

  async getTodo() {
    const result = await firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
    // @ts-ignore
    this.todoList = result;
    console.log(this.todoList)
    
    return this.todoList;
  }

  async addTodo(title: string): Promise<Todo> {

    const result = await firstValueFrom(this.http.post(`${environment.apiUrl}/todo`, {title: title}));
    console.log(result)

    // @ts-ignore
    return result;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }

    const result = await firstValueFrom(this.http.put(`${environment.apiUrl}/todo/${updatedTodo.id}`, updatedTodo));

    //@ts-ignore
    return result;
  }
}
