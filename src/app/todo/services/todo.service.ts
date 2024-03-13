import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: Todo[] = [];
  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public readonly todos$: Observable<Todo[]> = this._todos.asObservable();

  constructor(private http: HttpClient) {
    this.fetchTodos();
  }

  private fetchTodos(): void {
    this.http
      .get<Todo[]>(environment.apiUrl + '/AlexanderNiklasson/todo')
      .subscribe((todos) => {
        this.todoList = todos;
        this._todos.next([...this.todoList]);
      });
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoList.length + 1,
      title: title,
      completed: false,
    };
    this.todoList.push(todo);
    this.http
      .post<Todo>(environment.apiUrl + '/AlexanderNiklasson/todo', todo)
      .subscribe(() => {
        this.fetchTodos();
      });
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);
    return new Promise<Todo>((resolve, reject) => {
      this.http
        .put<Todo>(
          environment.apiUrl + '/AlexanderNiklasson/todo/' + foundTodo.id,
          foundTodo
        )
        .subscribe({
          next: (response) => {
            resolve(foundTodo);
            this.fetchTodos();
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }
}
