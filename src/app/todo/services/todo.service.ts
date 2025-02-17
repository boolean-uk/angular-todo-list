import { inject, Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService  {
  private http = inject(HttpClient);

  private todoSource = new Subject<Todo[]>();  // todoSource can push elements into the todolist

  todoList$ : Observable<Todo[]> = this.todoSource.asObservable()  //As long as todoList is defined as an observable todoSource



  constructor(){
    this.getTodos();
  }

  getTodos() : void{

    this.http.get<Todo[]>(`${environment.apiUrl}`)
    .subscribe((todo) => this.todoSource.next(todo));
  }

  addTodo(title: string) {
    const todo = {
      title: title,
    };
    this.http.post<Todo>(`${environment.apiUrl}`, todo).subscribe(_ => this.getTodos());
  }

  updateTodo(updatedTodo: Todo) {
    let success : boolean = false;
      this.http.put<Todo>(`${environment.apiUrl}` + "/" + `${updatedTodo.id}`, updatedTodo)
      .subscribe(_ => {
          this.getTodos()
        }
      );
  }
}
