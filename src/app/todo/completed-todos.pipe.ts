import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo';

@Pipe({
  name: 'completedTodos'
})
export class CompletedTodosPipe implements PipeTransform {

  transform(todos: Todo[] | null, showCompleted: boolean): Todo[] {
    if (todos == null) {
      return [];
    }
    return todos.filter(todo => todo.completed === showCompleted);
  }

}
