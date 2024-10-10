import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient)
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

  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  public getTodos(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>('https://boolean-uk-api-server.fly.dev/thomamn/todo')
  }

  public addTodo(title: string): Observable<Todo> {

    
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };


    this.todoList.push(todo);
    return this.httpClient.post<Todo>('https://boolean-uk-api-server.fly.dev/thomamn/todo', todo)
    
    //return todo;
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    
    //Object.assign(foundTodo, updatedTodo);
    console.log(updatedTodo)
    console.log('https://boolean-uk-api-server.fly.dev/thomamn/todo/'+String(updatedTodo.id))
    
    return this.httpClient.put<Todo>('https://boolean-uk-api-server.fly.dev/thomamn/todo/'+String(updatedTodo.id), updatedTodo)
    
  }
}
