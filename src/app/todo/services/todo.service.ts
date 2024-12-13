import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: Todo[] = [];
  
  constructor(private readonly http: HttpClient) {
  }


  get todos(): Promise<Todo[]> {
    return firstValueFrom(
      this.http.get<Todo[]>('https://boolean-api-server.fly.dev/Eliassoprani/todo')
    );
  }

  postTodo(title: string): Promise<Todo[]> {
    return firstValueFrom(
      this.http.post<Todo[]>('https://boolean-api-server.fly.dev/Eliassoprani/todo', {title: title})
    );
  }

  updateTodo(todo: Todo): Promise<Todo[]> {
    return firstValueFrom(
      this.http.put<Todo[]>(`https://boolean-api-server.fly.dev/Eliassoprani/todo/${todo.id}`, {title: todo.title, completed: todo.completed})
    )
  }

}
