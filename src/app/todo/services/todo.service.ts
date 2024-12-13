import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  get todos(): Promise<Todo[]> {
    console.log('Getting all todos from api');
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/${environment.ghUser}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    // @ts-ignore
    const todo : Todo = firstValueFrom(this.http.post(
      `${environment.apiUrl}/${environment.ghUser}/todo`,
      {
        title: title,
      }
    ));
    console.log('Added todo : ', todo);

    return todo;
  }

  async updateTodo(updatedTodo : Todo): Promise<Todo> {
    // @ts-ignore
    const foundTodo : Todo = firstValueFrom(this.http.put(
      `${environment.apiUrl}/${environment.ghUser}/todo/${updatedTodo.id}`,
      updatedTodo
    ));

    return foundTodo;
  }
}
