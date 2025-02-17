import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpC = inject(HttpClient); // Dependency Injection of HttpClient...

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
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  // public getTodos(): Observable<Todo[]>
  // public async getTodos(): Promise<Observable<Todo[]>>
  public getTodos(): Observable<Todo[]>
  {
    return this.httpC.get<Todo[]>(`${environment.apiUrl}/${environment.user}/todo`);
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.todoList.push(todo);

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}
