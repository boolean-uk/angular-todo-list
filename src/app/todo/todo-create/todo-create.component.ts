import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from '../model';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  @Output() onAdd = new EventEmitter<Todo>()

  form = this.fb.group({
    "title": ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[^\s]*\w+[^\s]*$/)]]
  })

  constructor(private fb: FormBuilder) {}

  add() {
    if(this.form.invalid)
      return
    
    this.onAdd.emit(this.form.value as Todo);
    this.form.reset();
  }
}
