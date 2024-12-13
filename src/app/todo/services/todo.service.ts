import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)

  todoList: Promise<Todo[]> = this.getTodos();

  async getTodos() {
    const res = await firstValueFrom(this.http.get<Todo[]>(`${environment.apiUrl}/todo`));
    console.log(res)    
    return res;
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post<Todo>(`${environment.apiUrl}/todo` ,{title: title})); 
    (await this.todoList).push(todo);
    return todo

  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = await firstValueFrom(
        this.http.put<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`,
        {
          title: updatedTodo.title,
          completed: updatedTodo.completed
        })
      );
      return todo
  }
}
