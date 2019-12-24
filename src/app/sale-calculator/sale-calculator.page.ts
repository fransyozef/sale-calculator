import { element } from 'protractor';
import { NumericKeyboardComponent } from './../numeric-keyboard/numeric-keyboard.component';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.page.html',
  styleUrls: ['./sale-calculator.page.scss'],
})
export class SaleCalculatorPage implements OnInit {

  @ViewChild(NumericKeyboardComponent, { static: false }) numericKeyPad: NumericKeyboardComponent;

  inputValues = {
    startValue: 0,
    procentage: 0
  };

  resultValues = {
    reduction: 0,
    salePrice: '0',
    addPrice: '0',
    reductionStr: '0'
  };

  constructor() { }

  ngOnInit() {
  }

  onValueChanged() {
    if (!this.inputValues.startValue !== null) {
      this.calculate();
    }
  }

  onProcentageChanged() {
    if (!this.inputValues.procentage !== null) {
      this.calculate();
    }
  }

  calculate() {
    this.resultValues.reduction = (this.inputValues.startValue * this.inputValues.procentage) / 100;
    this.resultValues.reductionStr = this.resultValues.reduction.toFixed(2);
    this.resultValues.salePrice  = (this.inputValues.startValue - this.resultValues.reduction).toFixed(2);
    this.resultValues.addPrice  = (this.inputValues.startValue + this.resultValues.reduction).toFixed(2);
  }

  onFocusValue($event) {
    this.numericKeyPad.show($event.srcElement);
  }

  async onFocusPercentage($event) {
    await this.numericKeyPad.show($event.srcElement);
  }

}
