import {Component} from '@angular/core';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  todo: string = '';
  addToDoErrors$ = this.todoService.addToDoErrors$;

  constructor(private todoService: TodoService) {}

  submit() {
    this.todoService.addTodo(this.todo);
  }
}
