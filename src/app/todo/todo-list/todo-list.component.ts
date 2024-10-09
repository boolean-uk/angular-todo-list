import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  showCompleted = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((response) => {
      this.todos = response;
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe((response) => {
      this.todos.push(response);
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((response) => {
      const index = this.todos.findIndex((t) => t.id === response.id);
      this.todos[index] = response;
    });
  }

  get filteredTodos(): Todo[] {
    return this.todos.filter((t) => this.showCompleted ? t.completed : !t.completed)
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
  }
}
