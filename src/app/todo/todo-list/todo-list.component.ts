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
  todos : Todo[] = [];
  showCompleted = false;

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  get filteredTodos() { 
    return this.todos.filter((todo) => this.showCompleted ? true : !todo.completed);
  }

  async newTodo(title: string) {
    console.log('newTodo method called with title:', title);
    await this.todoService.addTodo(title).toPromise();
    this.loadTodos();
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

}
