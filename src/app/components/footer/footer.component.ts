import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosServices } from 'src/app/services/todos.services';
import { map } from 'rxjs';
import { FilterEnum } from 'src/app/types/filter.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  noTodoClass$!: Observable<boolean>;
  activeCount$!: Observable<number>;
  itemLeftText$!: Observable<string>;
  filterEnum = FilterEnum;
  filter$!: Observable<FilterEnum>;

  constructor(private todosService: TodosServices) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isComplete).length)
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.itemLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `Item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.filter$ = this.todosService.filter$;
  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }

  ngOnInit(): void {}
}
