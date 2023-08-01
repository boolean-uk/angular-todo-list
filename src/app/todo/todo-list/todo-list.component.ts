import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from "@app/todo/services/todo.service";
import {Todo} from "@app/todo/models/todo";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  todos: Todo[] = [];
  updateErrs$ = this.todoService.errs;
  completedFilter = false;

  constructor(private readonly todoService: TodoService) {
  }

  toggleTodoFilter() {
    this.completedFilter = !this.completedFilter;
  }

  ngOnInit(): void {
    const sub = this.todoService.getAll(this.completedFilter)
      .subscribe(todos => {
        this.todos = todos;
      });
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
