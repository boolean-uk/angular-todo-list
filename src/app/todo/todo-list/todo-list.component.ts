import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}
  completed: boolean = false;
  todos: Todo[] = [];

  async ngOnInit() {
    this.todos = await this.todoService.getCompletedTodos(); 
  }

  async switch(){
    this.completed = !this.completed;
    if(!this.completed){
      this.todos = await this.todoService.getCompletedTodos();
    }
  }
  
  async newTodo(title: string) {
    try {
      await this.todoService.addTodo(title);
      this.todos = await this.todoService.getCompletedTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    if(!this.completed) {
      this.todos = await this.todoService.getCompletedTodos();
    }
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo.id);
    if(!this.completed) {
      this.todos = await this.todoService.getCompletedTodos();
    }
  }
}