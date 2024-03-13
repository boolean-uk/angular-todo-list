import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css'],
})
export class TodoUpdateComponent {
  @Input() set selectedTodo(todo: Todo | null) {
    if (todo) {
      this.updateForm.reset(todo);
    }
  }
  @Output() updateCompleted = new EventEmitter<void>();
  updateForm: FormGroup;

  constructor(private todoService: TodoService) {
    this.updateForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      completed: new FormControl(false),
    });
  }

  async updateTodo() {
  if (this.updateForm.valid) {
    await this.todoService.updateTodo(this.updateForm.value);
    this.updateCompleted.emit(); // Notify parent component
    this.updateForm.reset();
  }
  }
}
