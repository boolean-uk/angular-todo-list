import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone:false,
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  showAllTodos : boolean = false;
  public todos : Todo[] = []
  public incomplete : Todo[] = []
  constructor(private readonly todoService: TodoService) {
    this.showAllTodos = false;
  }
  ngOnInit(): void {
    this.todoService.todoList$.subscribe((todo) => {this.todos = todo; this.incomplete = todo.filter(t => !t.completed)});
    
  }

  showTodo(todo : Todo) : boolean {
    if (this.showAllTodos){
      return true;
    }
    return !todo.completed;
  }

  switchShowAllTodos() : void{
    this.showAllTodos = !this.showAllTodos;
  }


  updateTodo(todo: Todo)  {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) : void {
    this.todoService.addTodo(title);
  }
}
