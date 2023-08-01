import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  completed: boolean = false;
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] = [];

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    if(!this.completed) {
      this.todos = await this.todoService.getAllInCompletedTodos();
    } else {
      this.todos = await this.todoService.getAllCompletedTodos();
    }
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo.id);
    if(!this.completed) {
      this.todos = await this.todoService.getAllInCompletedTodos();
    } else {
      this.todos = await this.todoService.getAllCompletedTodos();
    }
    
  }

  async newTodo(title: string) {
    await this.todoService.createTodo(title);
    this.todos = await this.todoService.getAllInCompletedTodos();
  }

  async ngOnInit() {
    this.todos = await this.todoService.getAllInCompletedTodos();
  }

  async switch(){
    this.completed = !this.completed;
    if(!this.completed){
      this.todos = await this.todoService.getAllInCompletedTodos();
    } else {
      this.todos = await this.todoService.getAllCompletedTodos();
    }
  }
}
