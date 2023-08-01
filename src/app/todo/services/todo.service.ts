import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly http: HttpClient) {
  this.getAllTodos().then((chars) => (this.todoList = chars));}
  
  private todoList: Todo[] = [];

  // TODO replace with a get request
    async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}`)
    );

    console.log('res', response);

    return response;
  }

  todos: Promise<Todo[]> = Promise.resolve(this.getAllTodos());

  async addTodo(title: string) {
    // TODO: replace with a POST request
    const toCreate = {
      title: title,
    };
    const response = await firstValueFrom(
      this.http.post(`${environment.apiUrl}`, toCreate)
    );

    console.log(response)
  }


  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    const toCreate = {
      title: foundTodo.title,
      completed: foundTodo.completed,
    };
    const response = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/` + `${foundTodo.id}`, toCreate)
    );
    console.log(response)
    return foundTodo;
   
  }

  async deleteTodo(deletedTodo: Todo): Promise<Todo> {

    const foundTodo = this.todoList.find((todo) => todo.id === deletedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, deletedTodo);

    const response = await firstValueFrom(
      this.http.delete(`${environment.apiUrl}/` + `${foundTodo.id}`)
    );
    console.log(response)
    return foundTodo;
   
  }
}
