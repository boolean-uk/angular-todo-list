import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {
    this.todoService.getAllTodos().subscribe((data: any[]) => {
      this.todos = data;
    });
  }

  todos: Todo[] = [];

  private toggleCompleted: boolean = false;

  public updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
    const updatedTodos = this.todos.map((t) =>
      t.id === todo.id ? { ...t, completed: todo.completed } : t
    );
    this.todos = updatedTodos;
  }

  public newTodo(title: string) {
    this.todoService.addTodo(title).subscribe((res) => this.todos.push(res));
  }

  public getAllTodos() {
    return this.toggleCompleted
      ? this.todos.filter((todo) => todo.completed === true)
      : this.todos.filter((todo) => todo.completed === false);
  }

  public showCompleted() {
    this.toggleCompleted = true;
  }

  public showIncompleted() {
    this.toggleCompleted = false;
  }
}
