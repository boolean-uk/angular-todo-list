import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos = this.todoService.todos;
  filteredTodos: any;
  boolVal: boolean = false;

  constructor(private readonly todoService: TodoService) {
    this.filteredTodos = this.todos.then((x) =>
      x.filter((y) => y.completed === false)
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  filterCompleted() {
    this.boolVal = !this.boolVal;
    this.filteredTodos = this.todos.then((x) =>
      x.filter((y) => y.completed === this.boolVal)
    );
    return this.filteredTodos;
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }
}
