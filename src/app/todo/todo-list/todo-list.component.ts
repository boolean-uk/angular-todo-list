import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] = []
  filter: boolean = true
  
  ngOnInit(): void{
    this.getTodos()
  }

  getTodos() {
    this.todoService.getTodos().subscribe((response)=>{
      this.todos = response
    })
  }

  getFilteredTodos(){
    return this.filter ? this.todos.filter((t) => t.completed === false) : this.todos
  }

  toggleFilter(){
    this.filter = !this.filter
  }
  
  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo)
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title).subscribe(()=>{
      this.getTodos()
    });
  }
}