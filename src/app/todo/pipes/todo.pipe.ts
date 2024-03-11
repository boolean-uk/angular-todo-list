import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'todo',
})
export class TodoPipe implements PipeTransform {
  transform(
    value: Promise<Todo[]>,
    byComplete: boolean = false
  ): Promise<Todo[]> {
    return value.then((data: Todo[]) =>
      data.filter((t) => {
        if (byComplete) return t;
        return !t.completed;
      })
    );
  }
}
