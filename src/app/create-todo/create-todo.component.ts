import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoListComponent } from 'app/todo-list/todo-list.component';
import { TodoService } from 'app/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent {
  @Output() todoCreated = new EventEmitter()
  constructor(private todoService : TodoService){}
  
  newTodo : string = ''

  createTodo(){
    this.todoService.createTodo(this.newTodo)
    this.todoCreated.emit()
  }
}
