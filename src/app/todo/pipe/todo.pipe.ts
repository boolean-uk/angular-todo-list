import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'todo'
})
export class TodoPipe implements PipeTransform {

  transform(value: Promise<Todo[]>, state: boolean): Promise<Todo[]> {
    
    return value.then((data: Todo[]) => 
    data.filter((d) => {
      if (state)  return d;
      return !d.completed;
    } ))
  }

}
