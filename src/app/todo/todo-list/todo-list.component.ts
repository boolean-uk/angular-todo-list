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
  todos$: Observable<Todo[]> | null = null;
  showCompleted = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todos$ = this.todoService.getTodos();
  }

  filterTodos(todos: Todo[]): Todo[] {
    return this.showCompleted ? todos : todos.filter(todo => !todo.completed);
  }

  toggleCompletedView() {
    this.showCompleted = !this.showCompleted;
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title).subscribe(() => this.fetchTodos());
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo).subscribe(() => this.fetchTodos());
  }
}
