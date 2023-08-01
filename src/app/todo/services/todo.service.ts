import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GET_ALL_TODOS, USER } from '../constants';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    // {
    //   id: this.todoId++,
    //   title: 'serve the app',
    //   completed: true,
    // },
    // {
    //   id: this.todoId++,
    //   title: 'familiarise yourself with the codebase',
    //   completed: false,
    // },
    // {
    //   id: this.todoId++,
    //   title: 'start talking to the api',
    //   completed: false,
    // },
  ];

  constructor(private readonly http: HttpClient){

  }

  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  async getAllTodos(){
    return await firstValueFrom(this.http.get<Todo[]>(environment.apiUrl + USER + GET_ALL_TODOS))
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.todoList.push(todo);

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}

