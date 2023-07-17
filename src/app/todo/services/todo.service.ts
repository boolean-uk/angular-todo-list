import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.todoList.push(todo);

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}
