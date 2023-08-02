import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'app/todo';
import { TodoService } from 'app/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoListChanged = new EventEmitter<void>();

  constructor(private todoService: TodoService) {}

  async toggleTodo() {
    this.todo.completed = !this.todo.completed;
    await this.todoService.updateTodo(this.todo);
    this.todoListChanged.emit();
  }

  async deleteTodo() {
    await this.todoService.deleteTodo(this.todo);
    this.todoListChanged.emit();
  }
}
