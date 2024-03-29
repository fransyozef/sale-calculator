import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numeric-keyboard',
  templateUrl: './numeric-keyboard.component.html',
  styleUrls: ['./numeric-keyboard.component.scss'],
})
export class NumericKeyboardComponent implements OnInit {

  mapValues  = {
    'button-1' : '1',
    'button-2' : '2',
    'button-3' : '3',
    'button-4' : '4',
    'button-5' : '5',
    'button-6' : '6',
    'button-7' : '7',
    'button-8' : '8',
    'button-9' : '9',
    'button-0' : '0',
    'button-comma' : '.',
  };

  srcElement: any;

  viewState: boolean;

  values = [];

  rootElement: any = null;

  title = '';

  constructor() {
    this.viewState  = false;
  }

  ngOnInit() {

  }

  show(srcElement?: any) {
    this.srcElement  = srcElement;
    if (this.srcElement) {
      // this.srcElement.value = `${this.srcElement.value}`;
      this.toValues(this.srcElement.value);
      this.title = `${this.srcElement.value}`;
    }
    this.viewState  = true;
  }

  toValues(str: string) {
    let value  = `${str}`;
    if (value === 'NaN') {
      value = '0';
    }
    this.values = value.split('');
  }

  clear() {
    this.values = ['0'];
    this.updateValues();
  }

  hide() {
    this.srcElement.readonly = true;
    this.srcElement  = null;
    this.values = [];
    this.viewState  = false;
  }

  toggle() {
    this.viewState  = !this.viewState;
  }

  updateValues() {
      console.log(this.values);
      const valueStr  = this.values.join('');
      const commaIndex  = this.values.indexOf('.');

      const returnValue  = parseFloat(valueStr);

      this.srcElement.readonly = false;
      this.srcElement.value = `${this.srcElement.value}`;

      if (this.srcElement && this.srcElement.value) {
        const value = commaIndex >= 0 ? parseFloat(valueStr).toFixed(2) : parseFloat(valueStr);
        this.srcElement.value = `${value}`;
      }
      this.title  = `${returnValue}`;
      if (this.title === 'NaN') {
        this.title  = '';
      }

      this.srcElement.readonly = true;
  }

  clicked(button: string) {
    switch (button) {
      case 'button-backspace' : {
        this.values.pop();
        break;
      }
      default: {
        if (this.mapValues[button]) {
          if (this.values.length === 1 && this.values[0] === '0') {
            this.values.pop();
          }
          const val  = this.mapValues[button];
          this.values.push(val);
        }
        break;
      }
    }
    this.updateValues();
  }
}
