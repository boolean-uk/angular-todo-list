import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  ngOnInit(): void {
    this.loadTodoList()
  }
  todoList: Todo[] = []
  showCompleted: boolean = false
  constructor(private readonly todoService: TodoService) {}

  public loadTodoList() {
    this.todoService.getTodoList().subscribe((todoList) => {
      console.log(todoList)
      this.todoList = todoList
    })
  }

  public addNewTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.loadTodoList()
    })
  }

  public updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.loadTodoList()
    })
  }

  public toggleShowCompletedTodos(): void {
    this.showCompleted = !this.showCompleted
  }

  public filteredTodos(): Todo[] {
    if (this.showCompleted) {
      return this.todoList
    }
    return this.todoList.filter(todo => !todo.completed)
  }
}
