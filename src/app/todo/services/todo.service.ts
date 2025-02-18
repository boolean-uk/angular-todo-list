import {inject, Injectable} from '@angular/core';
import { Todo } from '../models/todo';
import {environment} from "../../../environments/environment";
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/${environment.githubUser}/todo`);
  }

  async addTodo(title: string): Promise<Todo> {
    return fetch(`${environment.apiUrl}/${environment.githubUser}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: title}),
    }).then((response) => response.json())
      .then((data: Todo) => {
        return data;
      });
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    return firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/${environment.githubUser}/todo/${updatedTodo.id}`, updatedTodo));
  }
}
