import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  urlPath = "/KonWritesCode/todo"


  private todoId = 1;
  private todoList: Todo[] = []

  get todos(): Promise<Todo[]> {
    console.log("get request");
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}` + this.urlPath));
  }

  async addTodo(title: string): Promise<Todo> {
    console.log("addToDo")
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}` + this.urlPath, 
    {
      //id: this.todoId++,
      title: title,
      completed: false
    }));
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = await firstValueFrom(this.http.put(`${environment.apiUrl}` + this.urlPath + `/${updatedTodo.id}`, 
    {
      //id: this.todoId++,
      title: updatedTodo.title, 
      completed: updatedTodo.completed
    }));
    // @ts-ignore
    return todo;
  }
}
