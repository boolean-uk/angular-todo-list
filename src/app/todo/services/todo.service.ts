import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //  replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  async getTodos(): Promise<Todo[]> {
    const response = await this.http.get<Todo[]>(`${this.apiUrl}/KarolinaMaczka/todo`).toPromise();
    return response || [];
  }

  // async addTodo(title: string): Promise<Todo> {
  //   // TODO: replace with a POST request
  //   const todo = {
  //     id: this.todoId++,
  //     title: title,
  //     completed: false,
  //   };
  //   this.todoList.push(todo);
  //
  //   return todo;
  // }

  async addTodo(title: string) {
    const todo: Todo = {
      id: 0,
      title: title,
      completed: false,
    };
    try {
    await this.http.post<Todo>(`${this.apiUrl}/KarolinaMaczka/todo`, todo).toPromise();}
    catch(e){
      console.error('Error adding todo:', e);

    }
  }


  // async updateTodo(updatedTodo: Todo): Promise<Todo> {
  //   // TODO: replace with a PUT request
  //   const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
  //   if (!foundTodo) {
  //     throw new Error('todo not found');
  //   }
  //   Object.assign(foundTodo, updatedTodo);
  //
  //   return foundTodo;
  // }

  async updateTodo(updatedTodo: Todo) {
    try {
      const response = await this.http.put<Todo>(`${this.apiUrl}/KarolinaMaczka/todos/${updatedTodo.id}`, updatedTodo).toPromise();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
}
