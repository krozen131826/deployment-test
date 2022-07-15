import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from '../components/todo/todo.component';
import { HeaderComponent } from '../components/header/header.component';
import { MainComponent } from '../components/main/main.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoDetailComponent } from '../components/todo-detail/todo-detail.component';
import { FooterComponent } from '../components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
];

@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    MainComponent,
    TodoDetailComponent,
    FooterComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
})
export class TodosModule {}
