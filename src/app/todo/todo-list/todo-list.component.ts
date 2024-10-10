import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { map } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos = this.todoService.todos;
  filteredTodos = this.getUncompleted()
  isCompletedTasks = false

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }

  getUncompleted() {
    // return this.todos.map(todos => todos.filter(proj => proj.completed === true));
    // TODO: read more about pipe()
    return this.todos.pipe(map(todos => todos.filter(task => task.completed === false)))
  }

  getCompletedTasks() {
    return this.todos.pipe(map(todos => todos.filter(task => task.completed === true)))
  }

  toggleCompletedTasks() {
    this.isCompletedTasks = !this.isCompletedTasks

    if (this.isCompletedTasks) {
      this.filteredTodos = this.getCompletedTasks()
    } else {
      this.filteredTodos = this.getUncompleted()
    }
  }
}
