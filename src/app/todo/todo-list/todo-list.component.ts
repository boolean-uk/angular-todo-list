import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos!: Promise<Todo[]>;
  filteredTodos!: Promise<Todo[]>;
  completed: boolean = true;

  constructor(private readonly todoService: TodoService) { console.log('url:', `${environment.apiUrl}`); }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    this.toggleCompleted();
  }

  toggleCompleted(): void {
    this.filteredTodos = this.todos.then(resolvedTodos => resolvedTodos.filter((filtered) => filtered.completed === this.completed));
    this.completed = !this.completed;
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.getTodos();
  }
}
