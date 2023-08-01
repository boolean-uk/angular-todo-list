import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { Todo } from '../model';
import { TodoService } from '../services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnDestroy {
  @Input() todo!: Todo
  @Output() onDelete = new EventEmitter<Todo>()

  private toggleSub?: Subscription

  constructor(private todoService: TodoService) {}

  @HostListener("click") toggleCompleted() {
    this.toggleSub = this.todoService.toggleTodo(this.todo)
      .subscribe(newTodo => this.todo.completed = newTodo.completed)
  }

  delete() {
    this.onDelete.emit(this.todo)
  }

  ngOnDestroy(): void {
    this.toggleSub?.unsubscribe()
  }
}
