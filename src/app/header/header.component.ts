import { Component, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ClassDataService } from '../class-data.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() classSelected = new EventEmitter<string>();
  selectedClass: string; // To store the selected class name

  classOptions: SelectItem[] = [
    { label: 'Class 1', value: 'Class 1' },
    { label: 'Class 2', value: 'Class 2' },
  ];

  constructor(private classDataService: ClassDataService) {}

  onClassChange(selectedClass: string) {
    this.classDataService.setSelectedClass(selectedClass);
  }

  showClassDialog() {
    // Use the DialogService to open the dialog here
    // You can create a new component for the dialog content
    // and pass data to it as needed.
  }
}
