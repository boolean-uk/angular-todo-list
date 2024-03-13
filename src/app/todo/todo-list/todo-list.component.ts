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
  showCompleted: boolean = false;

  todosToShow: Todo[] = [];

  loadTodos() {
    this.todosToShow = this.todos.filter((todo: Todo) => todo.completed === this.showCompleted);
  }

  swapShowComplete() {
    this.showCompleted = !this.showCompleted;
    this.loadTodos();
  }

  async ngOnInit() {
    // @ts-ignore
    const todoFromApi = await this.todoService.getTodos();
    this.todos = todoFromApi;
    this.loadTodos()
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.todos = this.todoService.todos;
    this.loadTodos()
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
    this.loadTodos()
  }
}
