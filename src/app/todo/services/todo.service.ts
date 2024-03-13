import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  private URL = 'https://boolean-api-server.fly.dev/JensArvid/todo';
  private todoId = 1;
  private todoList: Todo[] = [];
  constructor(private readonly http: HttpClient) {
    this.loadTodos();
  }

async loadTodos() {  
    this.todoList = await firstValueFrom(
      this.http.get<Todo[]>(this.URL)
    )
  }

 get todos(): Promise<Todo[]> {
    return firstValueFrom(
      this.http.get<Todo[]>(this.URL)
    )
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    const newTodo = await firstValueFrom(
      this.http.post<Todo>(this.URL, todo)
    );

    this.todoList.push(newTodo);

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!todo) {
    
      throw new Error('todo not found');
    }
    
    const updatedTodoResponse = await firstValueFrom(
      this.http.put<Todo>(`${this.URL}${updatedTodo.id}`, updatedTodo)
    );
    Object.assign(todo, updatedTodo);
    return updatedTodoResponse;
  }
}
