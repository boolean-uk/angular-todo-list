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
  todos$!: Observable<Todo[]>;
  filteredTodos$!: Observable<Todo[]>;
  showCompleted:boolean = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos$ = this.todoService.getTodos();
    this.applyFilter();
  }

  applyFilter(): void {
    if(!this.showCompleted) {
      this.filteredTodos$ = this.todos$.pipe(
        map(todos => todos.filter(todo => !todo.completed))
      );
    } else {
      this.filteredTodos$ = this.todos$.pipe(
        map(todos => todos.filter(todo => todo.completed))
      );
    }
  }

  toggleCompleted(): void {
    this.showCompleted = !this.showCompleted;
    this.loadTodos();
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe(updatedTodo => {
      this.loadTodos();
    });
  }

  newTodo(title: string): void {
    this.todoService.addTodo(title).subscribe(newTodo => {
      this.loadTodos();
    });
  }
}
