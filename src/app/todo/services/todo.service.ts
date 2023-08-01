import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
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
  todos: Promise<Todo[]> = this.getAllTodos()
  
  constructor(private readonly http: HttpClient) {
    this.getAllTodos().then((todos)=> (this.todoList = todos));
  }
  async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>('https://boolean-api-server.fly.dev/aronskay/todo')
    );
    return response;
  }
  async createTodo(title: string) {
    const toCreate = {
      title: title,
      completed: false,
  
      
    };
    const response = await firstValueFrom(
      this.http.post<Todo>('https://boolean-api-server.fly.dev/aronskay/todo', toCreate)
    );

    console.log(response);
  }
  async updateTodo(todo:Todo) {
    
    const toCreate = {
      title: todo.title,
      completed: true,
      id: todo.id
    };
    const response = await firstValueFrom(
      this.http.put(`https://boolean-api-server.fly.dev/aronskay/todo/${todo.id}`, toCreate)
    );

    console.log(response);
  }


  async getTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}`)
    )
    return response
    
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    //this.todoList.push(todo);
    const response1 = await firstValueFrom(
    this.http.post<Todo>('https://boolean-api-server.fly.dev/aronskay/todo',todo))
    return response1
  }
  async deleteTodo(todo: Todo):  Promise<void> {
     await firstValueFrom(
      this.http.delete<void>(`https://boolean-api-server.fly.dev/aronskay/todo/${todo.id}`)
    );
  }
  

}
