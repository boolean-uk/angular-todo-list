import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  showCompleted = false;
  /* showAll = false; */
  todos: Todo[] = [];

  async ngOnInit() {
    this.todos = await this.todoService.todos;
  }

  /* getAllTodos(): Todo[] {
    return this.showCompleted
      ? this.todos
      : this.getTodos()
  }; */

  getTodos(): Todo[] {
    return this.showCompleted
      ? this.todos.filter((todo: Todo) => todo.completed)
      : this.todos.filter((todo: Todo) => !todo.completed);
  }

  updateTodo(todo: Todo) {
    console.log(todo)
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = await this.todoService.todos;
  }
}
