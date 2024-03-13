import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [];
  constructor(private readonly http: HttpClient) {
    this.loadTodos();
  }
  
  async loadTodos() {  
    this.todoList = await firstValueFrom(
      this.http.get<Todo[]>('https://boolean-api-server.fly.dev/klaand01/todo')
    )
  }
      
      // {
        //   id: this.todoId++,
        //   title: 'serve the app',
  //   completed: true,
  // },
  // {
    //   id: this.todoId++,
    //   title: 'familiarise yourself with the codebase',
    //   completed: false,
    // },
    // {
      //   id: this.todoId++,
      //   title: 'start talking to the api',
      //   completed: false,
      // },
      
  get todos(): Promise<Todo[]> {
    return firstValueFrom(
      this.http.get<Todo[]>('https://boolean-api-server.fly.dev/klaand01/todo')
    )
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    const newTodo = await firstValueFrom(
      this.http.post<Todo>('https://boolean-api-server.fly.dev/klaand01/todo', todo)
    );

    this.todoList.push(newTodo);
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!todo) {
      throw new Error('todo not found');
    }

    const mewTodo = await firstValueFrom(
      this.http.put<Todo>(`https://boolean-api-server.fly.dev/klaand01/todo/${updatedTodo.id}`, updatedTodo)
    );

    console.log("UPDATED TODO", mewTodo);
    Object.assign(todo, updatedTodo);
    return mewTodo;
  }
}
