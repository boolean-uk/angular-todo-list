import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {TodoService} from "@app/todo/services/todo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit, OnDestroy {
  @Input('todo') todo?: Todo;
  subs: Subscription[] = [];

  constructor(private readonly todoService: TodoService) {
  }

  toggleCompleted() {
    if (!this.todo) throw new Error('Cannot toggle complete on null');
    this.todo.completed = !this.todo.completed;
    this.todoService.update(this.todo.id, this.todo);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
