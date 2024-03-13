import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
//@ts-ignore
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /* private todoId = 1;
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
  ]; */
  todos: Todo[] = [];
  constructor(private readonly http: HttpClient) {
    this.loadTodos();
  }

  // TODO replace with a get request
  /* todos: Promise<Todo[]> = Promise.resolve(this.todoList); */

  async loadTodos() {
    this.todos = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}/MackanPalm/todo`)
    );
  }

  async addTodo(title: string) {
    // TODO: replace with a POST request
    /* const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.todoList.push(todo);

    return todo; */

    const todoToCreate = { title };
    const todo = await firstValueFrom(
      this.http.post<Todo>(
        `${environment.apiUrl}/MackanPalm/todo`,
        todoToCreate
      )
    );
    this.todos = [...this.todos, todo];
    await this.loadTodos();
  }

  async updateTodo(updatedTodo: Todo) {
    // TODO: replace with a PUT request
    /* const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo); */

    const todo = await firstValueFrom(
      this.http.put<Todo>(
        `${environment.apiUrl}/MackanPalm/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );

    this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    await this.loadTodos();
  }
}
