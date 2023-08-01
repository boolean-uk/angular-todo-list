import {configDotenv} from "dotenv";
import {Injectable, OnInit} from '@angular/core';
import {Todo} from "@app/todo/models/todo";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  addTodo(title: string): Observable<Todo | undefined> {
    return of(undefined);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo | undefined> {
    return of(undefined);
  }

  ngOnInit(): void {
    configDotenv();
  }
}
