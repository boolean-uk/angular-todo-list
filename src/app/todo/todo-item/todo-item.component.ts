import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Todo } from '../model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo
  @Output() onDelete = new EventEmitter<Todo>()

  constructor(private todoService: TodoService) {}

  @HostListener("click") toggleCompleted() {
    this.todoService.toggleTodo(this.todo)
      .subscribe(newTodo => this.todo.completed = newTodo.completed)
  }

  delete() {
    this.onDelete.emit(this.todo)
  }
}
