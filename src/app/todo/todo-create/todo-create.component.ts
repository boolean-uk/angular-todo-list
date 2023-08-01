import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Todo } from '../model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  @Output() onAdd = new EventEmitter<Todo>()

  form = this.fb.group({
    "title": ['']
  })

  constructor(private fb: FormBuilder) {}

  add() {
    if(this.form.invalid)
      return
    
    this.onAdd.emit(this.form.value as Todo);
  }
}
