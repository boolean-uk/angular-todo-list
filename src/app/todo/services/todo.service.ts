import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;

  constructor(private readonly http: HttpClient) {

  }

  // // TODO replace with a get request
  // // todos: Promise<Todo[]> = Promise.resolve(this.todoList);

   addTodo(title: string): Observable<Todo> {
  
    const toCreate = {
      title: title,
    };
    return this.http.post<Todo>(`${environment.apiUrl}/PiotrSadolewski/todo`, toCreate)
  }

  // async updateTodo(updatedTodo: Todo): Promise<Todo> {
  //   // TODO: replace with a PUT request
  //   const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
  //   if (!foundTodo) {
  //     throw new Error('todo not found');
  //   }
  //   Object.assign(foundTodo, updatedTodo);

  //   return foundTodo;
  // }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/PiotrSadolewski/todo`);
  }
}

