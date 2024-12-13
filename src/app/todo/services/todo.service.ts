import { Injectable, OnInit, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  http = inject(HttpClient)

  get todos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get(`${environment.apiUrl}/oysteinbjo/todo`)).then()
  }

  async addTodo(title: string) {
    // TODO: replace with a POST request
    const todo = {
      title: title,
    }
    return this.http.post(`${environment.apiUrl}/oysteinbjo/todo`, todo)
      .subscribe(response => console.log(response))

  }

  updateTodo(updatedTodo: Todo) {
    // TODO: replace with a PUT request
    const foundTodo = this.http.get(`${environment.apiUrl}/oysteinbjo/todo/${updatedTodo.id}`);
    if (!foundTodo) {
      throw new Error('todo not found');
    }

    return foundTodo;
  }
}
