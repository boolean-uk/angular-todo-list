import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private readonly http: HttpClient) {
  }

  private todoId = 1;

  todos: Promise<Todo[]> = this.getTodoList()

  async getTodoList() : Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}`));


      console.log(response)
      
      return response
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    const response = await firstValueFrom(this.http.post(`${environment.apiUrl}`, todo))
    this.todos = this.getTodoList()

    console.log(response)

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const response = await firstValueFrom(
      this.http.put(`${environment.apiUrl}` + `/${updatedTodo.id}`, updatedTodo)
    )

    console.log(response)

    return updatedTodo;
  }
}
