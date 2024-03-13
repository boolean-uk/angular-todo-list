import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.css']
})
export class TodoShowComponent {
  @Output('toggleShow') toggleShow = new EventEmitter<boolean>()

  show = false

  toggle() {
    if (this.show) {
      this.show = false
    } else {
      this.show = true
    }
    this.toggleShow.emit(this.show)
  }
}
