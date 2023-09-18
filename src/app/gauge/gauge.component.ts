import { Component } from '@angular/core';
import { ClassDataService } from '../class-data.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent {
  averageTurtles: number;

  constructor (private classDataService: ClassDataService) {}

  thresholdConfig = {
    '0': {color: 'red'},
    '2.5': {color: 'yellow'},
    '4': {color: 'rgba(0, 182, 3, 0.8)'},
    '5': {color: 'rgba(0, 255, 3, 0.8)'},
  };

  ngOnInit() {
    this.averageTurtles = this.classDataService.getAverageTurtles();

    this.classDataService.averageTurtlesChanged.subscribe((averageTurtles: number) => {
      // Round to the nearest tenth and convert it back to a number
      this.averageTurtles = +averageTurtles.toFixed(1);
    });
  }
}
