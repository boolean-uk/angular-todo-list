import { Component } from '@angular/core';
import { Todo, TodoService } from 'app/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todoList: any | null = null;
  displayedTodos: any | null = null;
  showCompleted: boolean;

  constructor(private todoService: TodoService) {
    this.getAllTodos();
    this.showCompleted = false;
  }

  async getAllTodos() {
    this.todoList = await this.todoService.getAllTodos();
    this.displayedTodos = [...this.todoList];
  }

  handleCreateTodo() {
    this.getAllTodos();
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    if (this.todoList) {
      this.displayedTodos = this.showCompleted
        ? [...this.todoList]
        : this.todoList.filter((todo: Todo) => !todo.completed);
    }
  }
}
