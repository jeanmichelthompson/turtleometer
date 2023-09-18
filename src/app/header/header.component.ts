import { Component, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ClassDataService } from '../class-data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClassMenuComponent } from './class-menu/class-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [DialogService],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() classSelected = new EventEmitter<string>();
  selectedClass: string;
  ref: DynamicDialogRef | undefined;
  classOptions: SelectItem[] = [];

  constructor(private classDataService: ClassDataService, public dialogService: DialogService) {}

  ngOnInit() {
    this.classOptions = this.classDataService.classOptions;
  }

  onClassChange(selectedClass: string) {
    this.classDataService.setSelectedClass(selectedClass);
  }

  showClassDialog() {
    this.ref = this.dialogService.open(ClassMenuComponent, { header: "Edit Classes"});
  }
}
