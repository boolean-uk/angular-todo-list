import { Injectable, OnInit, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
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
  http = inject(HttpClient)
  todos: any;

  async ngOnInit(): Promise<void> {
    this.getTodos();
  }

  async getTodos() {
    const result = await firstValueFrom(this.http.get(`${environment.apiUrl}/mkmbaran/todo`));
    this.todos = result;
    return this.todos;
  }


  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await lastValueFrom(this.http.post(`${environment.apiUrl}/mkmbaran/todo`, {title: title}));
    return todo as Todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const newData = {
      title: updatedTodo.title,
      completed: updatedTodo.completed,
    };
    const updating = await lastValueFrom(this.http.put(`${environment.apiUrl}/mkmbaran/todo/${updatedTodo.id}`, newData))
    if (!updating) {
      throw new Error('todo not found');
    }
    console.log(updating); // Log to see if updated correctly
    return updating as Todo;
    
  }
}
