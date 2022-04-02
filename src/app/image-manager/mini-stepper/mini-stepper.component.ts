import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Step} from './model/step';

@Component({
  selector: 'app-mini-stepper',
  templateUrl: './mini-stepper.component.html',
  styleUrls: ['./mini-stepper.component.css'],
})
export class MiniStepperComponent implements OnInit {
  steps: Step[];
  @Output() chosenStepId: EventEmitter<number>;

  constructor() {
    this.chosenStepId = new EventEmitter<number>();
    this.steps = [
      {chosen: true, title: '1x'},
      {chosen: false, title: '2x'},
      {chosen: false, title: '3x'},
    ];
  }

  ngOnInit(): void {
  }

  chooseStep(index: number) {
    this.steps.forEach((step: Step) => {
      step.chosen = false;
    });
    this.steps[index].chosen = true;
    this.chosenStepId.emit(index);
  }

  changeSize(level: number): { [klass: string]: any } {
    const size: number = 2;
    const cssSize = `${level + 1 + size + 8 * (level + 1)}px`;
    const cssFontSize = `13px`;
    return {
      height: cssSize,
      width: cssSize,
      'font-size': cssFontSize,
    };
  }
}
