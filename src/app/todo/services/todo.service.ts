import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private todoId = 1;
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


  http = inject(HttpClient);

  // TODO replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  // async addTodo(title: string): Promise<Todo> {
  //   // TODO: replace with a POST request
  //   const todo = {
  //     id: this.todoId++,
  //     title: title,
  //     completed: false,
  //   };
  //   this.todoList.push(todo);

  //   return todo;
  // }

  getTodoById(id: Number) : Observable<Todo> {
    return this.http.get<Todo>(`${environment.apiUrl}todo${id}`).pipe (
      catchError(error => {
        console.error(error);
        throw error;
      }) 
    )
  }


  getTodos() : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}todo`).pipe (
      catchError(error => {
        console.error(error);
        throw error;
      }) 
    )
  }

  addTodo(title: String) : Observable<String> {
    return this.http.post<any>(`${environment.apiUrl}todo`, {
      "title": title
    }).pipe(
      catchError(error => {
        console.error(error)
        throw error;
      })
    )
  }


  updateTodo(todo: Todo) : Observable<Todo> {

    return this.http.put<Todo>(`${environment.apiUrl}todo/${todo.id}`, todo).pipe(
      catchError(error => {
        console.error(error)
        throw error;
      })
    )
  }
}
