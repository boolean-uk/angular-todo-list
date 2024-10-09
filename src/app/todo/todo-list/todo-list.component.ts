import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos = this.todoService.todos();

  filteredTodos: Promise<Todo[]> = this.todos

  // filterTodos() {
  //   this.filteredTodos = this.todos?.pipe(
  //     map((todos) =>
  //       todos.filter((todo) => todo.completed === false)
  //     )
  //   );
  // }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
    //this.filterTodos()
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos();
  }
}
