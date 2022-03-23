import { NumericKeyboardComponent } from '../numeric-keyboard/numeric-keyboard.component';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
// import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.page.html',
  styleUrls: ['./sale-calculator.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleCalculatorPage implements OnInit {

  @ViewChild(NumericKeyboardComponent, { static: false }) numericKeyPad: NumericKeyboardComponent;

  private slides: any;

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

  activeSlideIndex = 0;

  constructor() { }

  setSwiperInstance(swiper: any) {
    this.slides = swiper;
    this.activeSlideIndex = this.slides.activeIndex;
  }

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
    // this.slides.allowTouchMove = false;
    this.numericKeyPad.show();
  }

  showKeyboardInitialValue() {
    this.slides.allowTouchMove = false;
    this.numericKeyPad.show();
  }

  onKeyboardClose() {
    this.slides.allowTouchMove = true;
  }

  onUpdatedValue($event) {
    if ($event) {
      switch (this.slides.activeIndex) {
        case 0: {
          this.startingValue = $event;
          break;
        }
      }
    }
  }

  onSlideChange() {
    // console.log('onSlideChange');
    // console.log(this.slides.activeIndex);
    // this.numericKeyPad.hide();
  }

  toSlide(index: number) {
    const isActiveKeyboard = this.numericKeyPad.isActive();
    if (!isActiveKeyboard) {
      if (index && index >= 0) {
        index--;
        this.slides.slideTo(index);
      }
    }
  }

}
