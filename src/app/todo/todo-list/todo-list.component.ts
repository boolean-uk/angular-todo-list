import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private readonly todoService: TodoService) {}

  // todos = this.todoService.todos;

  ngOnInit(): void {
    this.loadTodos();
  }

  async loadTodos() {
    //@ts-ignore
    this.todos = await this.todoService.loadTodos();
  }
  updateTodo(todo: Todo) {
    console.log(todo);
    this.todoService.updateTodo(todo).then(() => this.loadTodos());
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.loadTodos();
  }
}
