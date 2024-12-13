import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] | null = null;
  todosFiltered: Todo[] | null = null;
  todosStatus: boolean = false;

  constructor(private readonly todoService: TodoService) {}

  async ngOnInit() {
    await this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.todoService.getAllTodos();
    this.filterTodos();
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.filterTodos();
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo);
    if (this.todos) {
      this.todos = this.todos.filter((item) => item.id !== todo.id);
      this.filterTodos();
    }
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.loadTodos();
  }

  toggleCompleted() {
    this.todosStatus = !this.todosStatus;
    this.filterTodos();
  }

  filterTodos() {
    if (this.todos) {
      this.todosFiltered = this.todos.filter(
        (todo) => todo.completed === this.todosStatus
      );
    }
  }
}
