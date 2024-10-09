import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}
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
  todos: Observable<Todo[]> = this.httpClient.get<Todo[]>(environment.apiUrl);

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.httpClient.post<Todo>(environment.apiUrl, { title }));
  
    if (!todo) {
      throw new Error('Failed to create todo');
    }
  
    return todo;
  }
  

  async updateTodo(updatedTodo: Todo): Promise<Todo> {

    console.log(updatedTodo);
    

  const todo = await firstValueFrom(this.httpClient.put<Todo>(environment.apiUrl + `/${updatedTodo.id}`, {title: updatedTodo.title, completed: updatedTodo.completed})) 

    return todo;
  }
}
