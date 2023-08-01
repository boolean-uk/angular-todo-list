import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  // TODO replace with a get request
  todos: Observable<Todo[]> | null = null
  private todoId: number = 1;
  private readonly api: string = environment.apiUrl

  private todoList: Todo[] = [{
    id: this.todoId++, title: 'serve the app', completed: true,
  }, {
    id: this.todoId++, title: 'familiarise yourself with the codebase', completed: false,
  }, {
    id: this.todoId++, title: 'start talking to the api', completed: false,
  },];

  constructor(private readonly http: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    const observable: Observable<Todo[]> = this.http.get<Todo[]>(this.api + "/przemoai/todo");
    return observable
  }

  addTodo(title: string) {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++, title: title, completed: false,
    };

    return this.http.post(this.api + "/przemoai/todo", todo)
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
