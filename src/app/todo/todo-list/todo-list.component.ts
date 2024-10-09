import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] =  []
  showCompleted: boolean = false;
  todoToEdit: Todo | null = null;

  constructor(private readonly todoService: TodoService) {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.fetchTodos();
    });
  }

  newTodo(todo: Todo) {
    if (todo.id) {
      this.todoService.updateTodo({ ...todo, title: todo.title }).subscribe(() => {
        this.fetchTodos();
        this.todoToEdit = null;
      });
    } else {
      this.todoService.addTodo(todo.title).subscribe(() => {
        this.fetchTodos();
      });
    }
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
    });

    this.resetEditingState();
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  getFilteredTodos(): Todo[] {
    if (this.showCompleted) {
      return this.todos;
    }

    return this.todos.filter(todo => !todo.completed);
  }

  editTodo(todo: Todo) {
    this.todoToEdit = todo;
  }

  resetEditingState() {
    this.todoToEdit = null;
  }
}