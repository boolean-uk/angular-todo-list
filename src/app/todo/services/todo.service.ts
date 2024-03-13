import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { NetworkService } from 'src/app/network.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [];

  constructor(private network: NetworkService) {
    network.baseURL = "https://boolean-api-server.fly.dev/migzus/"

    this.network.GET<Todo[]>("todo", (res) => {
      this.todoList = res
    })
  }

  get todos() : Promise<Todo[]> {
    return firstValueFrom(this.network.GET_SUBSCRIPTION("todo"))
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    
    console.log(todo)
    this.network.POST("todo", todo, () => {
      this.todoList.push(todo);
    })

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = this.todoList.find((todo) => { return todo.id === updatedTodo.id });
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    this.network.PUT("todo/" + updatedTodo.id, updatedTodo)

    return foundTodo;
  }
}
