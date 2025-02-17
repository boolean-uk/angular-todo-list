import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
 

  private http = inject(HttpClient)
  private todoList: Todo[] = []
  private url = "https://boolean-uk-api-server.fly.dev/sanderrasmussen/todo";

  public getToDos()
  {

    this.http.get<Todo[]>(this.url, {responseType:"json"})
      .subscribe(t => this.todoSource.next(t));
  }

  
  private todoSource = new Subject<Todo[]>();
  public todos: Observable<Todo[]> = this.todoSource.asObservable();

  constructor() {
    this.getToDos();
    this.todos.subscribe((launch) => {
      launch.forEach((launch) => {
        console.log(launch);
      });
    });
  }

  addTodo(title: string) {

    const todo = {
      title: title,
    };
    this.http.post<Todo>(this.url, todo).subscribe(_ => this.getToDos())

  }

  updateTodo(updatedTodo: Todo) {
    this.http.put<Todo>(`${this.url}/${updatedTodo.id}`, updatedTodo).subscribe(_ => this.getToDos());
  }
}
