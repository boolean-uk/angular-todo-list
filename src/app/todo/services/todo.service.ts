import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
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
  ];

  http = inject(HttpClient)
  // todos: any;


  // TODO replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  // First try:
    // async getTodos() {
    //   const result = await firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
    //   // @ts-ignore
    //   this.todos = result.results;
    //   return this.todos
    // }
  // Second try:
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/noahlenn/todo`));
  }


  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    // const todo = {
    //   id: this.todoId++,
    //   title: title,
    //   completed: false,
    // };
    // this.todoList.push(todo);

    // return todo;
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/noahlenn/todo`, {title: title}))
    // @ts-ignore

    return todo
  }

  async updateTodo(id: number): Promise<Todo> {
    // TODO: replace with a PUT request
    // const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    // if (!foundTodo) {
    //   throw new Error('todo not found');
    // }
    // Object.assign(foundTodo, updatedTodo);

    // return foundTodo;
    
    
    const todo = await firstValueFrom(this.http.get<Todo>(`${environment.apiUrl}/noahlenn/todo/${id}`));
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodoResponse = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/noahlenn/todo/${id}`, updatedTodo));
    
    return updatedTodoResponse;

  } 
}
