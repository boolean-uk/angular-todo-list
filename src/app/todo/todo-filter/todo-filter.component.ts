import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent {
  @Input("toggleState") state: boolean = true;
  @Output('toggle') toggle = new EventEmitter<boolean>();

  toggleFilter() {
    console.log("Emitting "+!this.state)
    this.toggle.emit(!this.state)
  }
}
