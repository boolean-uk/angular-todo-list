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

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addNewTodo(title: string): void {
    this.todoService.addTodo(title).subscribe((newTodo) => {
      this.todos.push(newTodo); 
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe((updatedTodo) => {
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      if (index > -1) {
        this.todos[index] = updatedTodo; 
      }
    });
  }

  get filteredTodos(): Todo[] {
    return this.todos.filter(todo => this.showCompleted ? todo.completed : !todo.completed);
  }

  toggleCompleted(): void {
    this.showCompleted = !this.showCompleted;
  }
}
