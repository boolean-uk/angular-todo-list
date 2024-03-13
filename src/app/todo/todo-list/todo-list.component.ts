import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Observable, map } from 'rxjs';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;
  filteredTodos$: Observable<Todo[]> | undefined;
  selectedStatus: 'all' | 'completed' | 'uncompleted' | undefined =
    'uncompleted';

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
    this.updateFilteredTodos();
  }
  updateFilteredTodos(): void {
    if (this.todos$) {
      this.filteredTodos$ = this.todos$.pipe(
        map((todos) => {
          if (this.selectedStatus === 'completed') {
            return todos.filter((todo) => todo.completed);
          } else if (this.selectedStatus === 'uncompleted') {
            return todos.filter((todo) => !todo.completed);
          } else {
            return todos;
          }
        })
      );
    }
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string): Promise<void> {
    await this.todoService.addTodo(title);
  }
}
