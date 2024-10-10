import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

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

  private httpClient = inject(HttpClient)

  // TODO replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  todos: Observable<Todo[]> = this.getAll()

  /**
   * getAll
   */
  public getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(environment.apiUrl)
  }

  /**
   * addTodo
   * @param title 
   */
  public addTodo(title: string) {
    const todo = {
      title: title,
      completed: false,
    }
    this.httpClient.post<Todo>(environment.apiUrl, todo).subscribe()
  }

  /**
   * updateTodo
   * @param updatedTodo 
   */
  public updateTodo(updatedTodo: Todo) {
    this.httpClient.put<Todo>(environment.apiUrl+`/${updatedTodo.id}`, updatedTodo).subscribe()
  }
}
