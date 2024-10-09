import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private httpClient = inject(HttpClient)
  
  private todoId = 1;
  private todoList: Observable<Todo[]> = this.getAllTodos();

  public getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${environment.apiUrl}/${environment.name}/todo`);
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.httpClient.post(`${environment.apiUrl}/${environment.name}/todo`, todo).subscribe();

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    console.log(updatedTodo)
    this.httpClient.put(`${environment.apiUrl}/${environment.name}/todo/${updatedTodo.id}`, updatedTodo).subscribe();

    return updatedTodo;
  }
}
