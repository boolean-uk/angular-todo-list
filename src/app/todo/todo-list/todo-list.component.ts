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

  async ngOnInit() {
    await this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.todoService.todos;
    this.filterTodos();
  }

  toggleShowCompleted = () => {
    this.showCompleted = !this.showCompleted;
    this.filterTodos();
  };

  async filterTodos() {
    if (this.showCompleted) {
      this.todos = await this.todoService.todos;
    } else {
      this.todos = (await this.todoService.todos).filter(
        (todo) => !todo.completed
      );
    }
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    await this.loadTodos();
  }
}
