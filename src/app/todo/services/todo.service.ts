import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private todoId = 1;
  private todoList: Observable<Todo[]> = this.todos();

  // TODO replace with a get request
  public todos(): Observable<Todo[]> {
    this.todoList = this.todoList = this.http.get<Todo[]>(`${environment.apiUrl}`);
    return this.todoList
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.http.post(`${environment.apiUrl}`, todo).subscribe((response) => {
      console.log('Server response: ', response)
    });
    this.todoList = this.todos()
    return todo;
  }

  public getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.apiUrl + '/' +id.toString()}`);
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    console.log(updatedTodo)
    const foundTodo = () => {
      this.http.put<Todo>(`${environment.apiUrl + '/' + updatedTodo.id.toString()}`, updatedTodo).subscribe((response) => {
      console.log('Server response: ', response)
    })}
    foundTodo()
    return updatedTodo;
  }
}
