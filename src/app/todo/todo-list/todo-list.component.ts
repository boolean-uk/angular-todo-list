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
  
  todos$: Observable<Todo[]> | undefined;
  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todos$ = this.todoService.todos;
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title).toPromise();
    this.loadTodos();
  }
}
