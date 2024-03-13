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
  showCompleted: boolean = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(
      (todos) => {
        this.todos = this.showCompleted
          ? todos
          : todos.filter((todo) => !todo.completed);
      },
      (error) => {
        console.error('Error loading todos:', error);
      }
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(
      (updatedTodo) => {
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  async newTodo(title: string) {
    try {
      await this.todoService.addTodo(title).toPromise();
      this.loadTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe(
      () => {
        this.todos = this.todos.filter((t) => t.id !== todoId);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  toggleCompletedVisibility() {
    this.showCompleted = !this.showCompleted;
    this.loadTodos();
  }

  get filteredTodos(): Todo[] {
    return this.showCompleted
      ? this.todos.filter((todo) => todo.completed)
      : this.todos.filter((todo) => !todo.completed);
  }
}
