import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  todoService = inject(TodoService)
  router = inject(Router)
  todoForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }

  submit() {
    this.todoService.addTodo(this.todoForm.value.title)
    this.router.navigate(["todo"])
  }
}
