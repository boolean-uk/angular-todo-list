import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private readonly http: HttpClient){

  }

  //get
  async getTodos(): Promise<Todo[]> {
    const response = await this.http.get<Todo[]>(`${environment.apiUrl}/juliagirejko/todo`).toPromise()
    console.log('res', response);

    return response || [];
  }

  //post
  async addTodo(title: string) {
    const todo = {
      id: 0,
      title: title,
      completed: false,
    };

    try{
      const response = await this.http.post<Todo>(`${environment.apiUrl}/juliagirejko/todo`, todo).toPromise()
    }
    catch(error) {
      console.error('Error adding new todo', error)
    }
  }

  //put
  async updateTodo(updatedTodo: Todo) {
    const foundTodo = (await this.getTodos()).find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    try{
      const response = await this.http.put<Todo>(`${environment.apiUrl}/juliagirejko/todo/` + foundTodo.id, updatedTodo).toPromise()
    }
    catch(error) {
      console.error('Error updating todo', error)
    }
  }
}
