import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-numeric-keyboard',
  templateUrl: './numeric-keyboard.component.html',
  styleUrls: ['./numeric-keyboard.component.scss'],
})
export class NumericKeyboardComponent implements OnInit {

  @Output() updatedValue = new EventEmitter<string>();

  mapValues = {
    'button-1': '1',
    'button-2': '2',
    'button-3': '3',
    'button-4': '4',
    'button-5': '5',
    'button-6': '6',
    'button-7': '7',
    'button-8': '8',
    'button-9': '9',
    'button-0': '0',
    'button-comma': '.',
  };

  srcElement: any;

  viewState: boolean;

  values = [];

  rootElement: any = null;

  title = '';

  constructor() {
    this.viewState = false;
  }

  ngOnInit() {

  }

  show(srcElement?: any) {
    this.srcElement = srcElement;
    if (this.srcElement) {
      this.srcElement.value = `${this.srcElement.value}`;
      this.toValues(this.srcElement.value);
      this.title = `${this.srcElement.value}`;
    }
    this.viewState = true;
  }

  toValues(str: string) {
    let value = `${str}`;
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
    if (this.srcElement) {
      this.srcElement.readonly = true;
      this.srcElement = null;
    }
    this.values = [];
    this.viewState = false;
  }

  toggle() {
    this.viewState = !this.viewState;
  }

  updateValues() {
    const valueStr = this.values.join('');
    const commaIndex = this.values.indexOf(',');

    const value = parseFloat(valueStr).toFixed(2);
    console.log(value);

    let convertedValue = `${value}`;
    convertedValue = convertedValue.replace('.', ',');
    if (convertedValue === 'NaN') {
      this.title = '';
    }

    // if (this.srcElement) {
    //   this.srcElement.readonly = false;
    //   this.srcElement.value = `${this.srcElement.value}`;
    //   this.srcElement.value = `${value}`;
    //   this.srcElement.readonly = true;
    // }


    if (this.values.length > 0) {
      this.updatedValue.emit(convertedValue);
    } else {
      this.updatedValue.emit('0,00');
    }


  }

  clicked(button: string) {
    switch (button) {
      case 'button-backspace': {
        this.values.pop();
        break;
      }
      default: {
        if (this.mapValues[button]) {
          if (this.values.length === 1 && this.values[0] === '0') {
            this.values.pop();
          }
          const val = this.mapValues[button];
          const commaIndex = this.values.indexOf('.');
          if (val !== '.') {
            if (commaIndex < 0) {
              this.values.push(val);
            } else {
              const len = this.values.length;
              const diff = len - commaIndex;
              if (diff <= 2) {
                this.values.push(val);
              }
            }
          } else {
            if (commaIndex < 0) {
              this.values.push(val);
            }
          }
        }
        break;
      }
    }
    this.updateValues();
  }
}
