import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  private todoId = 1;
  
  // TODO replace with a get request
 // todos: Promise<Todo[]> = Promise.resolve(this.todoList);

 public getTodos(): Observable<Todo[]> {
  return this.http.get<Todo[]>(`${environment.apiUrl}`);
}
public addTodo(title: String ) {
  const todo = {
    id: this.todoId++,
    title: title,
    completed: false,
  };
  this.http.post(`${environment.apiUrl}`, todo).subscribe((response: any) => {
    console.log('Server response:', response);
  });
  return todo;
  
}



  async updateTodo(updatedTodo: Todo) {
    // TODO: replace with a PUT request
    this.http
    .put(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo)
    .subscribe((response: any) => {
      console.log('Server response:', response);
    });
  }
}
