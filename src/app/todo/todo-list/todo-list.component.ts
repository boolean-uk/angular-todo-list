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
  showCompleted: boolean = false;

  async ngOnInit(): Promise<void> {
    this.todos = await this.todoService.getAllTodos();
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.todos = await this.todoService.getAllTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = await this.todoService.getAllTodos();
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo);
    this.todos = await this.todoService.getAllTodos();
  }

  toggle() {
    this.showCompleted = !this.showCompleted;
  }

  getCompletedTodos() {
    if (!this.todos) throw new Error('List does not exist!');
    return this.todos.filter((todo) => todo.completed);
  }

  getUncompletedTodos() {
    if (!this.todos) throw new Error('List does not exist!');
    return this.todos.filter((todo) => !todo.completed);
  }
}
