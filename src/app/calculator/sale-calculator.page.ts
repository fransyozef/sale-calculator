import { NumericKeyboardComponent } from '../numeric-keyboard/numeric-keyboard.component';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.page.html',
  styleUrls: ['./sale-calculator.page.scss'],
})
export class SaleCalculatorPage implements OnInit {

  @ViewChild(NumericKeyboardComponent, { static: false }) numericKeyPad: NumericKeyboardComponent;

  startingValue = "0,00";

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
    // if (!this.inputValues.startValue !== null) {
    //   this.calculate();
    // }
  }

  onProcentageChanged() {
    // if (!this.inputValues.procentage !== null) {
    //   this.calculate();
    // }
  }

  calculate() {
    // this.inputValues.startValue  = `${this.inputValues.startValue}` !== 'NaN' ? this.inputValues.startValue : 0;
    // this.inputValues.procentage  = `${this.inputValues.procentage}` !== 'NaN' ? this.inputValues.procentage : 0;

    // this.resultValues.reduction = (this.inputValues.startValue * this.inputValues.procentage) / 100;
    // this.resultValues.reductionStr = this.resultValues.reduction.toFixed(2);
    // this.resultValues.salePrice  = (this.inputValues.startValue - this.resultValues.reduction).toFixed(2);
    // this.resultValues.addPrice  = (this.inputValues.startValue + this.resultValues.reduction).toFixed(2);
  }

  showNumericKeyPad() {
    this.numericKeyPad.show();
  }

  showKeyboardInitialValue() {
    this.numericKeyPad.show();
  }

  onUpdatedValue($event) {
    if($event) {
      console.log($event);
      this.startingValue = $event;
    }
  }

}
