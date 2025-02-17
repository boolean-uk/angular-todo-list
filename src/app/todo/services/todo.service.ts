import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)


  // TODO replace with a get request
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/todo`, {
        title: title,
      })
    );
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const updated = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/todo/${updatedTodo.id}`, updatedTodo));

    // @ts-ignore
    return updated;
  }
}
