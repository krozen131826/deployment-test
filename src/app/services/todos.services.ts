import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodosInterface } from '../types/todos.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosServices {
  todos$ = new BehaviorSubject<TodosInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(todo: string): void {
    const newTodo: TodosInterface = {
      id: Math.random().toString(16),
      text: todo,
      isComplete: false,
    };
    const updatedTodo = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodo);
  }

  toggleAll(bool: boolean) {
    const updatedTodo = this.todos$.getValue().map((todos) => {
      return { ...todos, bool };
    });
    this.todos$.next(updatedTodo);
  }

  changeFilter(filter: FilterEnum): void {
    this.filter$.next(filter);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodo = this.todos$.getValue().map((todos) => {
      if (todos.id === id) {
        return { ...todos, text };
      }
      return todos;
    });
    this.todos$.next(updatedTodo);
  }

  removeTodo(id: string): void {
    const removeTodos = this.todos$
      .getValue()
      .filter((todos) => todos.id !== id);

    this.todos$.next(removeTodos);
  }

  toggleTodo(id: string): void {
    const updatedTodo = this.todos$.getValue().map((todos) => {
      if (todos.id === id) {
        return { ...todos, isComplete: !todos.isComplete };
      }
      return todos;
    });
    this.todos$.next(updatedTodo);
  }
}
