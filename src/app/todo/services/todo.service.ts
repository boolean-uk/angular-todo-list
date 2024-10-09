import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient);
  // private basepath = 'https://boolean-uk-api-server.fly.dev/dagandreas/todo';

  // Create a behavioursubject to allow for signals when updating the list
  private todoSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todoSubject.asObservable();
  public hideCompleted = false;

  toggleHideCompleted() {
    this.hideCompleted = !this.hideCompleted;
    this.fetchAllTasks()
  }

  constructor() {
    console.log('fetching tasks');
    this.fetchAllTasks();
  }

  private fetchAllTasks() {
    this.httpClient.get<Todo[]>(environment.apiUrl).subscribe((todos) => {
      this.todoSubject.next(todos);
    });
  }

  getAllTasks(): Observable<Todo[]> {
    return this.todos$.pipe(
      map((todos: Todo[]) => {
        if (this.hideCompleted) {
          return todos.filter((todo) => !todo.completed);
        }
        return todos;
      })
    );
  }

  addTodo(title: string): Observable<Todo> {
    return this.httpClient.post<Todo>(environment.apiUrl, { title }).pipe(
      tap((newTodo) => {
        const currentTdos = this.todoSubject.getValue();
        this.todoSubject.next([...currentTdos, newTodo]);
      })
    );
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${environment.apiUrl}/${updatedTodo.id}`;
    return this.httpClient.put<Todo>(url, updatedTodo);
  }
}
