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
  [x: string]: any;
  todos: Observable<Todo[]> | null = this.todoService.todos;
  allVisible = false;

  constructor(private readonly todoService: TodoService) {}

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.todos = this.todoService.getTodos();
    });
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe({
      next: (value) => {
        this.todos = this.todoService.getTodos();
      },
      error: (error) => {
        throw new Error('todo not found');
      },
      complete: () => {},
    });
  }

  showCompleted() {
    this.allVisible = !this.allVisible;
  }
}
