import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TODO_ENDPOINT, USER } from '../constants';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [];

  constructor(private readonly http: HttpClient) {}

  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  async getAllTodos() {
    this.todoList = await firstValueFrom(
      this.http.get<Todo[]>(environment.apiUrl + USER + TODO_ENDPOINT)
    );
    return this.todoList;
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    const newTodo = await firstValueFrom(
      this.http.post<Todo>(environment.apiUrl + USER + TODO_ENDPOINT, todo)
    );
    return newTodo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    console.log(updatedTodo);
    console.log(this.todoList);
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }

    const newTodo = await firstValueFrom(
      this.http.put<Todo>(
        environment.apiUrl +
          USER +
          TODO_ENDPOINT +
          '/' +
          updatedTodo.id.toString(),
        updatedTodo
      )
    );

    return newTodo;
  }
}
