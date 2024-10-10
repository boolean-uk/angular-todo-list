import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] = [];
  showCompleted = false;

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getData().subscribe((todos) => {
      this.todos = todos;
    });
  }

  updateTodo(todo: Todo) {
    console.log(todo)
    this.todoService.updateTodo(todo);
  }

  get filteredTodos(): Todo[] {
    return this.todos.filter(todo => this.showCompleted ? todo.completed : !todo.completed);
  }

  toggleCompleted(): void {
    this.showCompleted = !this.showCompleted;
  }

  async newTodo(title: string) {
    this.todoService.addTodo(title).subscribe((newTodo) => {
      this.todos.push(newTodo); 
    });
  }
}
