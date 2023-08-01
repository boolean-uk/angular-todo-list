import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private readonly http: HttpClient)
  {

  }
  
  private todoList: Todo[] = [];

async getAllTodos(): Promise<Todo[]> {

const response = await firstValueFrom(this.http.get<Todo[]>('https://boolean-api-server.fly.dev/dziubichmarlena/todo'))
console.log('res',response)
return  response

}


async createTodo(title:string){
  const toCreate = {
    title: title
  }
  const response = await firstValueFrom(this.http.post('https://boolean-api-server.fly.dev/dziubichmarlena/todo', toCreate));
  console.log(response);
}

async updateTodo(todo:Todo) {

  
  const response = await firstValueFrom(
    this.http.put('https://boolean-api-server.fly.dev/dziubichmarlena/todo' + '/' + todo.id, todo)
  );

  console.log(response);
}









  // // TODO replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  // async addTodo(title: string): Promise<Todo> {
  //   // TODO: replace with a POST request
  //   const todo = {
  //     id: this.todoId++,
  //     title: title,
  //     completed: false,
  //   };
  //   this.todoList.push(todo);

  //   return todo;
  // }

  // async updateTodo(updatedTodo: Todo): Promise<Todo> {
  //   // TODO: replace with a PUT request
  //   const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
  //   if (!foundTodo) {
  //     throw new Error('todo not found');
  //   }
  //   Object.assign(foundTodo, updatedTodo);

  //   return foundTodo;
  // }
}
