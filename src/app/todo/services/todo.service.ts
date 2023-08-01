import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [];
  constructor(private readonly http: HttpClient) {
    this.getAllTodos().then((todo) => (this.todoList = todo));
  }
  
  async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}`)
    );

    console.log('res', response);

    return response;
  }
  // TODO replace with a get request
  todos: Promise<Todo[]> = this.getAllTodos()

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    const response = await firstValueFrom(
      this.http.post(environment.apiUrl, todo)
    );
      this.todos=this.getAllTodos()
    console.log("addTodo",response);
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
  
    const response = await firstValueFrom(
      this.http.put<Todo>(environment.apiUrl+"/"+updatedTodo.id, updatedTodo)
    );
    return response;
  }
  async deleteTodo(deletedTodo: Todo): Promise<Todo> {
  
    const response = await firstValueFrom(
      this.http.delete<Todo>(environment.apiUrl+"/"+deletedTodo.id)
    );
    return response;
  }
}
export interface todoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Todo[];
}
