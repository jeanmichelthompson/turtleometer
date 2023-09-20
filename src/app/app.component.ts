import { Component } from '@angular/core';
import { ClassDataService } from './class-data.service';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'turtleometer';
  classOptions: SelectItem[] = [
    { label: 'Default', value: 'Default' },
  ];

  constructor (private classDataService: ClassDataService) {}

}
