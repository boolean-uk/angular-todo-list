import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {

  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    if(this.todo.completed==true){
      let id:string = this.todo.id.toString();
      let element = document.getElementById(id)?document.getElementById(id):null;
      //set class = hidden??
      
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }
}
