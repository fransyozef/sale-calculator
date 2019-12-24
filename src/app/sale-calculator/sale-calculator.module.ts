import { NumericKeyboardComponent } from './../numeric-keyboard/numeric-keyboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaleCalculatorPage } from './sale-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: SaleCalculatorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SaleCalculatorPage,
    NumericKeyboardComponent,
  ]
})
export class SaleCalculatorPageModule {}
