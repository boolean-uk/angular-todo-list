import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] | null = null;
  todosFiltered: Todo[] | null = null;
  todosStatus: boolean = false;
  async ngOnInit() {
    this.todos = await this.todoService.getAllTodos();
    this.todosFiltered = this.todos.filter((todo) => !todo.completed);

    console.log(this.todos);
  }
  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo);
    if (this.todos) {
      this.todos = this.todos.filter((item) => item.id !== todo.id);
    }
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = await this.todoService.getAllTodos();
  }

  async toggleCompleted() {
    if (this.todos) {
      this.todosFiltered = this.todos.filter(
        (todo) => todo.completed === this.todosStatus
      );
    }
  }
}
