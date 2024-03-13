import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {
    this.getTodos(); //kör getTodos när man startar program
  }

  //GET all todos
  todos: any;
  allTodos: any;

  async getTodos(): Promise<Todo[]> {
    const result = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/alexandra7667/todo`)
    );
    this.allTodos = result;
    //only show todos that have not been completed (completed=false)
    // @ts-ignore
    const filteredTodos = result.filter((todo) => !todo.completed);
    this.todos = filteredTodos;
    return this.todos;
  }

  //POST to create a new todo
  newTodo: any;

  async addTodo(title: string): Promise<Todo> {
    const jsonObjectToCreate = { title: title };
    const result = await firstValueFrom(
      this.http.post(
        `${environment.apiUrl}/alexandra7667/todo`,
        jsonObjectToCreate
      )
    );
    this.newTodo = result;
    this.todos.push(this.newTodo);
    return this.newTodo;
  }

  //PUT to update an existing todo
  updatedTodo: any;

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const jsonObjectToUpdate = {
      title: updatedTodo.title,
      completed: updatedTodo.completed,
    };
    const result = await firstValueFrom(
      this.http.put(
        `${environment.apiUrl}/alexandra7667/todo/${updatedTodo.id}`,
        jsonObjectToUpdate
      )
    );
    this.updatedTodo = result;
    //updatera local list
    const index = this.todos.findIndex(
      (todo: Todo) => todo.id === updatedTodo.id
    );
    this.todos[index] = updatedTodo;
    //filtrera
    const filteredTodos = this.todos.filter((todo: Todo) => !todo.completed);
    this.todos = filteredTodos;
    return this.updatedTodo;
  }

  //Toggle between completed and non-completed todos
  toggle: boolean = false;

  async toggleTodos() {
    //kolla om toggle är på
    if (this.toggle) {
      //visa alla todos som har completed=true
      const filteredTodos = this.allTodos.filter((todo: Todo) => todo.completed);
      this.toggle = false;
      this.todos = filteredTodos;
    } else {
      const filteredTodos = this.allTodos.filter((todo: Todo) => !todo.completed);
      this.toggle = true;
      this.todos = filteredTodos;
    }
  }
}
