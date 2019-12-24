import { Component, OnInit, Renderer, ElementRef } from '@angular/core';

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

  constructor(
    private renderer: Renderer,
    private elem: ElementRef
  ) {
    this.viewState  = false;
  }

  ngOnInit() {

  }

  show(srcElement?: any) {
    this.srcElement  = srcElement;
    if (this.srcElement) {
      this.srcElement.blur();
    }
    this.viewState  = true;
  }

  hide() {
    this.srcElement  = null;
    this.values = [];
    this.viewState  = false;
  }

  toggle() {
    this.viewState  = !this.viewState;
  }

  clicked(button: string) {
    switch (button) {
      case 'button-backspace' : {
        this.values.pop();
        break;
      }
      default: {
        // console.log(button);
        if (this.mapValues[button]) {
          const val  = this.mapValues[button];
          this.values.push(val);
        }
        break;
      }
    }
    // console.log(this.values);

    const valueStr  = this.values.join('');
    const commaIndex  = this.values.indexOf('.');

    let returnValue  = null;
    if (commaIndex >= 0) {
      returnValue = parseFloat(valueStr).toFixed(2);
    } else {
      returnValue = parseFloat(valueStr);
    }

    if (this.srcElement && this.srcElement.value) {
      this.srcElement.value = returnValue;
    }
  }
}
