import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showCompleted: boolean = false;
  todoService = inject(TodoService);
  currentEditingTodoId: number | null = null;
  constructor() {}

  todos = this.todoService.todos;

  ngOnInit() {
    this.fetchTodos();
  }

  async fetchTodos() {
    this.todos = await this.todoService.getTodos();
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    await this.fetchTodos(); // Refresh the list to reflect the update
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.fetchTodos(); // Refresh the list after adding a new todo
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  get visibleTodos() {
    return this.todos.filter((todo: any) =>
      this.showCompleted ? todo.completed : !todo.completed
    );
  }

  beginEdit(todoId: number) {
    this.currentEditingTodoId = todoId;
  }

  handleUpdateCompleted() {
    this.currentEditingTodoId = null;
    this.fetchTodos(); // Optionally refresh the todos
  }
}
