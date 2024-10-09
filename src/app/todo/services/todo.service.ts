import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* PREVIOUS CODE
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
  ];*/

  // TODO replace with a get request
  //todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  // Fetch todos from the API
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${this.apiUrl}/santhia97/todo`));
  }


  async addTodo(title: string): Promise<Todo> {
    const newTodo = await firstValueFrom(this.http.post(`${this.apiUrl}/santhia97/todo`, { title }));
    console.log(newTodo)
    // @ts-ignore
    return newTodo
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request     
    // Send a PUT request to the API to update the todo
    const updated = await firstValueFrom(this.http.put<Todo>(`${this.apiUrl}/santhia97/todo/${updatedTodo.id}`, updatedTodo));
    return updated;
  }

}




