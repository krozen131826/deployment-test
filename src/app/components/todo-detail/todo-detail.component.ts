import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodosInterface } from 'src/app/types/todos.interface';
import { TodosServices } from 'src/app/services/todos.services';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  @Input('data') todosProps!: TodosInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  editingText: string = '';

  constructor(private todosServices: TodosServices) {}

  editMode() {
    this.setEditingIdEvent.emit(this.todosProps.id);
  }

  removeTodo(): void {
    this.todosServices.removeTodo(this.todosProps.id);
  }

  toggleTodo(): void {
    this.todosServices.toggleTodo(this.todosProps.id);
  }

  changeText(event: Event): void {
    let value = (<HTMLInputElement>event.target).value;
    this.editingText = value;
  }

  changeTodo() {
    this.todosServices.changeTodo(this.todosProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }

  ngOnInit(): void {
    this.editingText = this.todosProps.text;
  }
}
