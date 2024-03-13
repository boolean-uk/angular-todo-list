import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  showCompleted: boolean = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  async fetchTodos() {
    try {
      this.todos = await this.todoService.getTodos();
      this.filterTodos();
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
    this.filterTodos();
  }

  filterTodos() {
    if (this.showCompleted) {
      this.filteredTodos = this.todos;
    } else {
      this.filteredTodos = this.todos.filter((todo) => !todo.completed);
    }
  }

  async updateTodo(todo: Todo) {
    try {
      await this.todoService.updateTodo(todo);
      this.fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async newTodo(title: string) {
    try {
      await this.todoService.addTodo(title);
      this.fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
}
