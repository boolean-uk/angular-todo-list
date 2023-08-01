import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, TodoService } from 'app/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo! : Todo
  @Output() toggleStatus = new EventEmitter<void>()
  constructor(private todoService: TodoService){}

  updateTodo(){
    this.todo.completed = !this.todo.completed
    this.todoService.updateTodo(this.todo)
  }
}
