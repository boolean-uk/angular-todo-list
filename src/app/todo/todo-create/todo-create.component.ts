import {Component, OnDestroy} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnDestroy {
  subs: Subscription[] = [];
  todoTitle: string = '';

  constructor(private readonly todoService: TodoService) {
  }

  submit() {
    const sub = this.todoService.add(this.todoTitle).subscribe();
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
