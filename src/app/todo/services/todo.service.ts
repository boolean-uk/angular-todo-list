// import { Injectable } from '@angular/core';
// import { Todo } from '../models/todo';

// @Injectable({
//   providedIn: 'root',
// })
// export class TodoService {
//   private todoId = 1;
//   private todoList: Todo[] = [
//     {
//       id: this.todoId++,
//       title: 'serve the app',
//       completed: true,
//     },
//     {
//       id: this.todoId++,
//       title: 'familiarise yourself with the codebase',
//       completed: false,
//     },
//     {
//       id: this.todoId++,
//       title: 'start talking to the api',
//       completed: false,
//     },
//   ];

//   // TODO replace with a get request
//   todos: Promise<Todo[]> = Promise.resolve(this.todoList);

//   async addTodo(title: string): Promise<Todo> {
//     // TODO: replace with a POST request
//     const todo = {
//       id: this.todoId++,
//       title: title,
//       completed: false,
//     };
//     this.todoList.push(todo);

//     return todo;
//   }

//   async updateTodo(updatedTodo: Todo): Promise<Todo> {
//     // TODO: replace with a PUT request
//     const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
//     if (!foundTodo) {
//       throw new Error('todo not found');
//     }
//     Object.assign(foundTodo, updatedTodo);

//     return foundTodo;
//   }
// }

import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-api-server.fly.dev/pialoana/todo';
  todos$: Observable<Todo[]> = of([]);

  constructor(private readonly http: HttpClient) {
    this.loadTodos(); // Load todos when the service is constructed
  }

  loadTodos() {
    this.todos$ = this.http.get<Todo[]>(this.apiUrl);
  }

  async addTodo(title: string, completed = false) {
    const todoToCreate = { title, completed };
    const todo = await this.http
      .post<Todo>(this.apiUrl, todoToCreate)
      .toPromise();
    console.log('created todo:', todo);
    this.loadTodos(); // Reload todos after adding a new one
  }

  async updateTodo(updatedTodo: Todo) {
    const updatedTodoFromServer = await this.http
      .put<Todo>(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo)
      .toPromise();
    console.log('updated todo:', updatedTodoFromServer);
    this.todos$ = this.todos$.pipe(
      map((todos: Todo[]) =>
        todos.map((todo: Todo) =>
          todo.id === updatedTodo.id ? updatedTodoFromServer : todo
        )
      ),
      map(
        (updatedTodos: (Todo | undefined)[]) =>
          updatedTodos.filter((todo) => todo !== undefined) as Todo[]
      )
    );
  }
}
