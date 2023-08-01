import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$?: Observable<Todo[]>

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos()
  }
}
