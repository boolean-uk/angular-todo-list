import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  http = inject(HttpClient)
  todoList: any;

  get todos(): Promise<Todo[]> {
  const res =  firstValueFrom(this.http.get(`${environment.apiUrl}/uerbzr/todo`));
  // @ts-ignore
  return res
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/uerbzr/todo`, 
      {title: title}))
    return todo as Todo;
  }


  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    console.log(updatedTodo)
    const foundTodo = await firstValueFrom(this.http.put(`${environment.apiUrl}/uerbzr/todo/${updatedTodo.id}`, { title: updatedTodo.title, completed: updatedTodo.completed }))
    if (!updatedTodo){
      throw new Error('todo not found')
    }
    return foundTodo as Todo
}
}
