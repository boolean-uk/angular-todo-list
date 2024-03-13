import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
//@ts-ignore
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todoDone: boolean = false;

  constructor(public readonly todoService: TodoService) {}

  todos = this.todoService.todos;

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }

  renderDoneOrNot() {
    if (this.todoDone) {
      this.todoDone = false;
    } else {
      this.todoDone = true;
    }
  }
}
