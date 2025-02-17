import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showAllTodos = false;
  todos: Observable<Todo[]>;
  unfinishedTodos: Observable<Todo[]>;

  constructor(private readonly todoService: TodoService) {
    this.todos = this.todoService.getTodos();
    this.unfinishedTodos = this.todoService.getTodoUnfinished(this.todos);
  }

  updateTodo(todo: Todo) {
    console.log(todo);
    this.todoService.updateTodo(todo).subscribe(() => {
      this.refreshTodos();
    });
  }


  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.refreshTodos();
  }

  private refreshTodos() {
    this.todos = this.todoService.getTodos();
    this.unfinishedTodos = this.todoService.getTodoUnfinished(this.todos);
  }
}
