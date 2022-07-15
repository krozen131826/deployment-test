import { Component, OnInit } from '@angular/core';
import { TodosServices } from 'src/app/services/todos.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  text: string = '';
  constructor(private todosServices: TodosServices) {}

  changeText(event: Event): void {
    this.text = (<HTMLInputElement>event.target).value;
  }

  addTodo(): void {
    this.todosServices.addTodo(this.text);
    this.text = '';
  }

  ngOnInit(): void {}
}
