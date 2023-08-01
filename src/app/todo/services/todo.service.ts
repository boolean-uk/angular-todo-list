import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // TODO replace with a get request
  todos: Observable<Todo[]> | null = null;
  private todoId: number = 1;
  private readonly API: string = environment.apiUrl;
  private readonly API_GET_TODOS: string = `${this.API}/${environment.user}/todo`;
  private readonly API_POST_TODO: string = `${this.API}/${environment.user}/todo`;
  private readonly API_PUT_DELETE_TODO: string = `${this.API}/${environment.user}/todo/`;

  constructor(private readonly http: HttpClient) {
    this.todos = this.getTodos();
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_GET_TODOS);
  }

  addTodo(title: string) {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    return this.http.post(this.API_POST_TODO, todo);
  }

  updateTodo(updatedTodo: Todo) {
    // TODO: replace with a PUT request
    let foundTodo;
    this.todos?.subscribe((todoList: Todo[]) => {
      foundTodo = todoList.find((todo: Todo) => todo.id === updatedTodo.id);
      if (!foundTodo) {
        throw new Error('todo not found');
      }
      this.http
        .put(this.API_PUT_DELETE_TODO + foundTodo.id, updatedTodo)
        .subscribe();

      return foundTodo;
    });
  }

  deleteTodo(updatedTodo: Todo) {
    return this.http.delete(this.API_PUT_DELETE_TODO + updatedTodo.id);
  }
}
