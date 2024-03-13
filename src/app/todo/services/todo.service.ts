import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class TodoService {

  constructor(private http: HttpClient) {
    this.getTodos(); //kör getTodos när man startar program. todos visas ej i browser
  }


  //GET all todos
  todos: any;

  async getTodos(): Promise<Todo[]> {
    const result = await firstValueFrom(this.http.get(`${environment.apiUrl}/alexandra7667/todo`));
    console.log("in get todos method" + result)
    this.todos = result;
    return this.todos;
  }


  //POST to create a new todo
  todo: any;

  async addTodo(title: string): Promise<Todo> {
    const jsonObjectToCreate = {title: title}
    const result = await firstValueFrom(this.http.post(`${environment.apiUrl}/alexandra7667/todo`, jsonObjectToCreate));
    this.todo = result;
    return this.todo;
  }


  //PUT to update an existing todo
  updatedTodo: any;

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const jsonObjectToUpdate = {title: updatedTodo.title, completed: updatedTodo.completed}
    const result = await firstValueFrom(this.http.put(`${environment.apiUrl}/alexandra7667/todo/${updatedTodo.id}`, jsonObjectToUpdate));
    this.updatedTodo = result;
    return this.updatedTodo;
  }
}
