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
      this.http.get<todoResponse>(`${environment.apiUrl}`)
    );

    console.log('res', response);

    return response.results;
  }
  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.getAllTodos())
  //Promise.resolve(this.todoList);

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
   // this.todoList.push(todo);
    const response = await firstValueFrom(
      this.http.post(environment.apiUrl, todo)
    );

    console.log("addTodo",response);
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    //Object.assign(foundTodo, updatedTodo);
    const response = await firstValueFrom(
      this.http.put(environment.apiUrl+foundTodo.id, updatedTodo)
    );
    return foundTodo;
  }

}
export interface todoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Todo[];
}
