import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos?: Todo[]

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos)
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo)
      .subscribe(newTodo => {
        this.todos?.push(newTodo)
      })
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo)
      .subscribe(deletedTodo => {
        const index = this.todos?.findIndex(todo => todo.id == deletedTodo.id)
        if(index != null && index != -1)
          this.todos?.splice(index, 1)
      })
  }
}
