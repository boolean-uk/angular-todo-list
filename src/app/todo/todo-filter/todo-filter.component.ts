import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../model';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent {
  @Output() onChange = new EventEmitter<TodoFilter>()

  filters = {
    allTodoFilter,
    completedTodoFilter,
    uncompletedTodoFilter
  }

  setFilter(todoFilter: TodoFilter) {
    this.onChange.emit(todoFilter)
  }
}

export type TodoFilter = (todo: Todo) => boolean
export const allTodoFilter: TodoFilter = (todo: Todo) => true
export const completedTodoFilter: TodoFilter = (todo: Todo) => todo.completed
export const uncompletedTodoFilter: TodoFilter = (todo: Todo) => !todo.completed
