import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {
    this.filtered$ = this.filter();
  }

  todos$: Observable<Todo[]> = this.todoService.getAllTodos();
  filtered$: Observable<Todo[]>;
  completed: boolean = false;

  toggleCompleted() {
    this.completed = !this.completed;
    console.log(this.completed);
    this.filtered$ = this.filter();
  }

  filter(): Observable<Todo[]> {
    return this.todos$.pipe(
      map((todos: Todo[]) => {
        return this.completed ? todos : todos.filter((todo) => !todo.completed);
      })
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
  }
}
