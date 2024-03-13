import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit{
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] = [];

  ngOnInit(): void {
      this.todoService.getTodos().subscribe(
        {
          next: (todos) => {
            this.todos = todos;
            console.log("Fetched todos: ", this.todos)
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
  }
  

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(title: string) {
    const newTodo = {
      id: this.todos.length + 1,
      title: title,
      completed: false,
    }

    this.todoService.addTodo(title).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      }
    )
    this.todos.push(newTodo);
    console.log(this.todos)
    
  }
}
