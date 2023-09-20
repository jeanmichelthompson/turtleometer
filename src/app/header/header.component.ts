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
  isEditingClasses: boolean = false;

  constructor(private classDataService: ClassDataService, public dialogService: DialogService) {}

  ngOnInit() {
    this.classOptions = this.classDataService.getClassOptions();
    this.classDataService.classOptionsChanged.subscribe((options) => {
      this.classOptions = options;
    });
    this.classDataService.selectedClassChanged.subscribe((selectedClass: string) => {
      if (selectedClass == "") {
        this.selectedClass = selectedClass;
      }
    })
  }

  onClassChange(selectedClass: string) {
    this.classDataService.setSelectedClass(selectedClass);
  }

  showClassDialog() {
    if (this.classDataService.isElectron == false) {
      this.ref = this.dialogService.open(ClassMenuComponent, { header: "Edit Classes"});
    } else {
      this.isEditingClasses = !this.isEditingClasses;
    }
  }
}
