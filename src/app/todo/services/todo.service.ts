import {Injectable} from '@angular/core';
import {Todo} from "@app/todo/models/todo";
import {BehaviorSubject, catchError, ignoreElements, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "@env/environment";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private refresh$ = new BehaviorSubject<void>(undefined);
  private update$ = new Subject<Todo>();
  private updateErrs$: Observable<void | Error> = this.update$
    .pipe(switchMap((todo) => this.http.put<Todo>(this.url(todo.id), todo).pipe(
      ignoreElements(), catchError((err) => of(err))
    )));
  private todos$ = this.refresh$.pipe(switchMap(() => this.http.get<Todo[]>(this.url())));

  constructor(private readonly http: HttpClient) {
  }

  get errs() {
    return this.updateErrs$;
  }

  add(title: string): Observable<Todo> {
    return this.http.post<Todo>(this.url(), {title}).pipe(tap(() => this.refresh$.next()));
  }

  getOne(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.url(id));
  }

  getAll(completedFilter: boolean): Observable<Todo[]> {
    return this.todos$.pipe(
      map(todos => todos.filter(t => t.completed === completedFilter))
    );
  }

  update(id: number, updatedTodo: Todo) {
    this.update$.next(updatedTodo);
  }

  delete(id: number): Observable<Todo> {
    return this.http.delete<Todo>(this.url(id));
  }

  private url(id?: number): string {
    return `${env.apiUrl}/${env.username}/todo${id ? `/${id}` : ''}`;
  }
}
