import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../model';
import { TodoFilter, uncompletedTodoFilter } from '../todo-filter/todo-filter.component';
import { Subscription, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos?: Todo[]
  todoFilter = uncompletedTodoFilter

  private subs: Subscription[] = []

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.subs.push(
      this.todoService.getTodos()
        .subscribe(todos => this.todos = todos)
    )
  }

  addTodo(todo: Todo) {
    this.subs.push(
      this.todoService.addTodo(todo)
        .subscribe(newTodo => {
          this.todos?.push(newTodo)
        })
    )
  }

  deleteTodo(todo: Todo) {
    this.subs.push(
      this.todoService.deleteTodo(todo)
        .subscribe(deletedTodo => {
          const index = this.todos?.findIndex(todo => todo.id == deletedTodo.id)
          if(index != null && index != -1)
            this.todos?.splice(index, 1)
        })
    )
  }

  filterTodo(todoFilter: TodoFilter) {
    this.todoFilter = todoFilter
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
}
