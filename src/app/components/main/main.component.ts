import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { TodosServices } from 'src/app/services/todos.services';
import { TodosInterface } from '../../types/todos.interface';
import { map } from 'rxjs/operators';
import { FilterEnum } from 'src/app/types/filter.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  visibleTodos$!: Observable<TodosInterface[]> | undefined;
  noTodoClass$!: Observable<boolean>;
  isAllTodoSelected$!: Observable<boolean>;
  editingID: string | null = null;

  constructor(private todosService: TodosServices) {
    this.isAllTodoSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todos) => todos.isComplete))
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodosInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isComplete);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isComplete);
        }
        return todos;
      })
    );
  }

  toggleAlltodos(event: Event) {
    let dataEvent: boolean = (<HTMLInputElement>event.target).checked;

    this.todosService.toggleAll(dataEvent);
  }

  setEditingId(data: string | null) {
    this.editingID = data;
  }

  ngOnInit(): void {}
}
