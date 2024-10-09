import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {

  todoService = inject(TodoService)

  showCompleted: boolean = false;

  todos$: Observable<Todo[]> = this.todoService.getAllTodos()
  .pipe(
    map(todos => todos.filter(todo => !todo.completed))  
  );

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.todos$ = this.todoService.getAllTodos()
    .pipe(
      map(todos => this.showCompleted ? todos : todos.filter(todo => !todo.completed))
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(
      (response) => {
        console.log("Todo updated:", response);
        this.todos$ = this.todoService.getAllTodos().pipe(
          map(todos => this.showCompleted ? todos : todos.filter(todo => !todo.completed))
        );
      }
   );
  }

  async newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.todos$ = this.todoService.getAllTodos()
      .pipe(
        map(todos => this.showCompleted ? todos : todos.filter(todo => !todo.completed))
      );
    });
  }
}
