import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  private showCompleted: boolean = false;
  constructor(private readonly todoService: TodoService) {}
  todos$ = new Observable<Todo[]>();
  filteredTodos: Todo[] = [];

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(): void {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe((todos) => {
      this.applyFilter(todos);
    });
  }

  private applyFilter(todos: Todo[]): void {
    this.filteredTodos = todos.filter(
      (todo) => this.showCompleted || !todo.completed
    );
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.refreshTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.refreshTodos();
  }

  public toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.todos$.subscribe((todos) => this.applyFilter(todos));
  }
}
