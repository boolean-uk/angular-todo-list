import { Component, Input } from '@angular/core';
import {Todo, UpdateTodo} from '../models/todo';
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: Todo | null = null;
  checked: boolean | undefined = this.todo?.completed;

  constructor(private readonly todoService: TodoService) {}

  onCheckboxChange(checked: boolean | undefined) {
    this.todoService.updateTodo(<number>this.todo?.id, <UpdateTodo>{
      // @ts-ignore
      title: this.todo.title,
      completed: checked
    });
    console.log("checked")
  }
}
