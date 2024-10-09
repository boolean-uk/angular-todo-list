import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = []
  showCompleted: boolean = false;

  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.loadTodos();
    });
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.loadTodos();
    });
  }

  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
  }

  filteredTodos(): Todo[] {
    if (this.showCompleted) {
      return this.todos;
    }
    return this.todos.filter(todo => !todo.completed);
  }
}
