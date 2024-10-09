import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /*private todoId = 1;
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
  ];*/

  private httpClient = inject(HttpClient)

  private url = 'https://boolean-uk-api-server.fly.dev/tuvaea/todo'

  // TODO replace with a get request
  //todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  public getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url)
  }

  public addTodo(todo: string): Observable<Todo>{
    console.log("adding task ", todo)
    return this.httpClient.post<Todo>(this.url, {title: todo})
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    /*const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;*/
    const url = `${this.url}/${updatedTodo.id}`;
    return this.httpClient.put<Todo>(url, updatedTodo);
  }
}
