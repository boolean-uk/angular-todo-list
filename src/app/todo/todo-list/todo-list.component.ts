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
  showCompleaded: Boolean = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  async loadTodos() {
    const response = await this.todoService.loadTodos();
    this.todos = this.filterTodos(response);
  }
  updateTodo(todo: Todo) {
    console.log(todo);
    this.todoService.updateTodo(todo).then(() => this.loadTodos());
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.loadTodos();
  }

  toggleCompleated() {
    this.showCompleaded = !this.showCompleaded;
    this.loadTodos();
  }

  // helper
  private filterTodos(todos: Todo[]): Todo[] {
    if (this.showCompleaded) {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos.filter((todo) => !todo.completed);
    }
  }
}
