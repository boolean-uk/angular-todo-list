import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)
  todos: any; 
  async getTodo(){
    const result = await firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
    // @ts-ignore
    this.todos = result;
    return this.todos;
  }

  async addTodo(title: string): Promise<Todo>{
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/todo`, {title: title}));
    // @ts-ignore
    return todo;

  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const index = this.todos.findIndex((item: Todo) => item.id === updatedTodo.id);
    if (index === -1) {
      throw new Error('Todo not found');
    }
    
    const todoUpdate: Todo = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`, {title: updatedTodo.title, completed: updatedTodo.completed}));
    this.todos[index] = todoUpdate;
    return todoUpdate;
  }
  

 /* private todoId = 1;
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

  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.todoList);

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
  }*/
}
