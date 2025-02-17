import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient)
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  public getTodos(): Observable<Todo[]> {
    this.http.get<Todo[]>(environment.apiUrl).subscribe(
      todos => this.todosSubject.next(todos)
    );
    return this.todosSubject.asObservable();
  }

  public addTodo(title: string){
 
    this.http.post<Todo>(environment.apiUrl, { title, completed: false })
      .subscribe((newTodo: Todo) => {
        const currentTodos = this.todosSubject.getValue();
        this.todosSubject.next([...currentTodos, newTodo]);
      });
  }

  public updateTodo(updatedTodo: Todo): void {
    this.http.put(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo)
      .subscribe(() => {
        const currentTodos = this.todosSubject.getValue();
        const updatedTodos = currentTodos.map(todo => 
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        this.todosSubject.next(updatedTodos);
      });
  }
}
