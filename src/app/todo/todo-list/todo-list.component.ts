import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] = [];
  showCompletedTodos: boolean = false;

  async ngOnInit() {
    this.todos = await this.todoService.todos;
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = await this.todoService.todos;
    
  }
  getTodos(): Todo[] {
    return this.showCompletedTodos
      ? this.todos.filter((todo: Todo) => todo.completed)
      : this.todos.filter((todo: Todo) => !todo.completed);
    }
}
