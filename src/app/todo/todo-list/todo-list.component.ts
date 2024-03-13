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

  todos = this.todoService.todos;
  displayedTodos: Todo[] = [];
  filtered: boolean = false;

  async ngOnInit() {
    this.displayedTodos = (await this.todos).filter((todo) => !todo.completed);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async toggleFilter() {
    //If toggled, show completed
    if (this.filtered) {
      this.displayedTodos = (await this.todos).filter(
        (todo) => !todo.completed
      );
    } else {
      this.displayedTodos = (await this.todos).filter((todo) => todo.completed);
    }
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }
}
