import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [];

  constructor(private readonly http: HttpClient) { }

  async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}/todo`)
    );

    console.log('res', response);

    return response;
  }

  // TODO replace with a get request
  todos: Promise<Todo[]> = this.getAllTodos();

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    const response = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/todo`, todo)
    );
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // do not know how to solve it other way
    const temp = await this.getAllTodos();
    const foundTodo = temp.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const toCreate = {
      id: foundTodo.id,
      title: foundTodo.title,
      completed: !foundTodo.completed,
    }
    const response = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/todo/${toCreate.id}`, toCreate)
    );

    return foundTodo;
  }
}