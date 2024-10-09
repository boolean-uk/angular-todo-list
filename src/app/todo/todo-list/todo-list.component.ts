import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos.filter((todo) => {
        if (this.todoService.hideCompleted && todo.completed) return false;
        else return true;
      });
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) {
    this.todoService.addTodo(title);
  }

  toggleCompleted() {
    this.todoService.toggleHideCompleted();
  }
}
