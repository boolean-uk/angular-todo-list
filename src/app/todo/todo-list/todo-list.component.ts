import {Component, OnInit} from '@angular/core';
import {TodoService} from '@app/todo/services/todo.service';
import {Todo} from '@app/todo/models/todo';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todosRefresh$ = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todosRefresh$.asObservable();
  completedFilter = false;

  constructor(private readonly todoService: TodoService) {
  }

  toggleTodoFilter() {
    this.completedFilter = !this.completedFilter;
    this.updateTodos();
  }

  ngOnInit(): void {
    this.updateTodos();
  }

  private updateTodos() {
    this.todoService.getAll().subscribe((todos) => {
      this.todosRefresh$.next(
        todos.filter((todo) => todo.completed === this.completedFilter)
      );
    });
  }
}
