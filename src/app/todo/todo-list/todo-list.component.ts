import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {
    this.fetchTodos();
  }

  todos: any;

  //Vänta på att data hämtats
  async fetchTodos() {
    this.todos = await this.todoService.getTodos();
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.todos = this.todoService.todos;
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }
}
