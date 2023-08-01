import { Component } from '@angular/core';
import { Todo, TodoService } from 'app/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todoList : any | null= null;

  constructor(private todoService : TodoService){
    this.getAllTodos()
  }
  getAllTodos(){
    this.todoList = this.todoService.getAllTodos()
  }
  handleCreateTodo(){
    this.getAllTodos()
  }
}

