import {ChangeDetectorRef, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: Todo[] = [];
  private completedToDoList: Todo[] = [];
  private notCompletedToDoList: Todo[] = [];

  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  completedToDos: Promise<Todo[]> = Promise.resolve(this.completedToDoList)
  notCompletedToDos: Promise<Todo[]> = Promise.resolve(this.notCompletedToDoList)

  constructor(private readonly http: HttpClient) {
    this.getToDoList().subscribe((toDo: Todo[]) => {
      toDo.forEach((toDo: Todo)=> {
        this.todoList.push(toDo);
        if(toDo.completed) this.completedToDoList.push(toDo)
        else this.notCompletedToDoList.push(toDo)
      });
    });
  }

  getToDoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://boolean-api-server.fly.dev/himokkk/todo/')
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo: Todo = {
      id: 0,
      title: title,
      completed: false,
    };

    const response: Todo = await firstValueFrom(this.http.post<Todo>('https://boolean-api-server.fly.dev/himokkk/todo/', todo))
    this.todoList.push(response);
    this.notCompletedToDoList.push(response);
    return response;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo: Todo | undefined = this.todoList.find((todo: Todo): boolean => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }

    if(foundTodo.completed) {
      this.completedToDoList.splice(this.completedToDoList.indexOf(foundTodo), 1)
      this.notCompletedToDoList.push(foundTodo)
    }
    else {
      this.notCompletedToDoList.splice(this.notCompletedToDoList.indexOf(foundTodo), 1)
      this.completedToDoList.push(foundTodo)
    }

    Object.assign(foundTodo, updatedTodo);
    await firstValueFrom(this.http.put<Todo[]>(
      'https://boolean-api-server.fly.dev/himokkk/todo/' + updatedTodo.id, updatedTodo))
    return foundTodo;
  }

  async deleteTodo(deletedTodo: Todo): Promise<void> {
    const foundTodo: Todo | undefined = this.todoList.find((todo: Todo): boolean => todo.id === deletedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }

    if(foundTodo.completed)
      this.completedToDoList.splice(this.completedToDoList.indexOf(foundTodo), 1);
    else
      this.notCompletedToDoList.splice(this.notCompletedToDoList.indexOf(foundTodo), 1);

    await firstValueFrom(this.http.delete<Todo[]>(
      'https://boolean-api-server.fly.dev/himokkk/todo/' + deletedTodo.id))

    this.todoList.splice(this.todoList.indexOf(foundTodo), 1)
  }
}
