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

  todos!: Promise<Todo[]>;
  showingCompleted = false;

  ngOnInit() {
    this.refreshTodos();
  }

  private refreshTodos() {
    this.todos = this.todoService.getTodos().then(todos => 
      todos.filter(todo => todo.completed === this.showingCompleted)
    );
  }

  toggleShowCompleted() {
    this.showingCompleted = !this.showingCompleted;
    this.refreshTodos();
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.refreshTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.refreshTodos();
  }
}
