import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  
  // The line below is Angulars HttpClient service, IF want to use..
  // http = inject(HttpClient)
  // firstValueFrom(): This is a utility function provided by RxJS. It's used to convert an Observable into a Promise, resolving with the first value emitted by the Observable. This is particularly useful when working with Angular's HttpClient because its get()
  private url = `${environment.apiUrl}/KantheeK/todo`
  private todoList: Todo[] = []
  
  
  // private todoId = 1;
  // private todoList: Todo[] = [
  //   {
  //     id: this.todoId++,
  //     title: 'serve the app',
  //     completed: true,
  //   },
  //   {
  //     id: this.todoId++,
  //     title: 'familiarise yourself with the codebase',
  //     completed: false,
  //   },
  //   {
  //     id: this.todoId++,
  //     title: 'start talking to the api',
  //     completed: false,
  //   },
  // ];

  // TODO replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  // Task 1: Get request:
  async todos() {
    console.log(this.url);
    const response = await fetch(this.url, {
      method: 'GET'
    });
    const todoList = await response.json();
    console.log(todoList);
    
    return todoList;
  }



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

  // Method 1:
  // const newTodo = await this.http.post<Todo>(this.url, todo).toPromise();

  // Task 2: POST request: (Methode 2)
  async addTodo(title: string) {
    const response = await fetch(this.url, {
      headers: {
        'Content-Type': 'application/json', // Specifying the content type
      },
      method: 'POST',
      body: JSON.stringify({title: title, completed: false }) // This is what you want to pass, and convert to JSON format
    });
    // Error handle
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    const newTodo = await response.json();
    return newTodo;
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


  // Task 3: POST request: (Methode 2)
  // Specifying that updateTodo returns Promise of object type <Todo>
  async updateTodo(_updatedTodo: Todo): Promise<Todo> {
    const id = _updatedTodo.id;
    const response = await fetch(this.url+ `/${id}`, {
      headers: {
        'Content-Type': 'application/json', // Specifying the content type
      },
      method: 'PUT',
      body: JSON.stringify({title: _updatedTodo.title, completed: _updatedTodo.completed }) // This is what you want to pass, and convert to JSON format
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const updatedTodo = await response.json();

    // Object.assign(foundTodo, _updatedTodo);
    console.log(updatedTodo);
    
    return updatedTodo;
  }


}
