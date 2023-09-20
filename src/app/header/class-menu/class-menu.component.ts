import { Component, Input } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ClassDataService } from 'src/app/class-data.service';

@Component({
  selector: 'app-class-menu',
  templateUrl: './class-menu.component.html',
  styleUrls: ['./class-menu.component.css']
})
export class ClassMenuComponent {

  className: string;
  newClass: string;
  isEditingNames: boolean = false;
  isAddingClass: boolean = false;

  classOptions: SelectItem[] = [];

  constructor(private classDataService: ClassDataService) {}

  ngOnInit() {
    this.classOptions = this.classDataService.getClassOptions();
    this.classDataService.classOptionsChanged.subscribe((options) => {
      this.classOptions = options;
    });
    this.classDataService.updateClassOptions(this.classOptions);
  }

  editClass(classOption: SelectItem) {
    if (this.classDataService.isElectron == true) {
      this.isEditingNames = !this.isEditingNames;
    } else {
       // Assuming classOption contains properties like 'label' and 'value'
      // Prompt the user for a new class name (you can use a dialog or input field)
       const newClassName = prompt('Enter the new class name', classOption.label);

      if (newClassName) {
        // Find the index of the classOption in the classOptions array
        const index = this.classOptions.indexOf(classOption);

        if (index !== -1) {
          // Update the class option with the new class name
          this.classOptions[index].label = newClassName;

          // Update the class options in the ClassDataService
          this.classDataService.updateClassOptions(this.classOptions);
        }
      }
    }
  }

  updateClassNameInService(classOption, newClassName) {
    if (classOption) {
      // Find the index of the classOption in the classOptions array
      const index = this.classOptions.indexOf(classOption);

      if (index !== -1) {
        // Update the class option with the new class name
        this.classOptions[index].label = newClassName;

        // Update the class options in the ClassDataService
        this.classDataService.updateClassOptions(this.classOptions);
      } else {
        console.log("Failed to change class name")
      }
    }
  }

  deleteClass(classOption: SelectItem) {
    if (this.classDataService.isElectron == false) {
      // Assuming classOption contains properties like 'label' and 'value'
      // Confirm with the user before deleting the class
      const confirmDelete = confirm(`Are you sure you want to delete the class "${classOption.label}"?`);

      if (confirmDelete) {
        // Find the index of the classOption in the classOptions array
        const index = this.classOptions.indexOf(classOption);

        if (index !== -1) {
          // Remove the class option from the array
          this.classOptions.splice(index, 1);

          // Update the class options in the ClassDataService
          this.classDataService.updateClassOptions(this.classOptions);
        }
      }
    } else {
        const index = this.classOptions.indexOf(classOption);

        if (index !== -1) {
          // Remove the class option from the array
          this.classOptions.splice(index, 1);

          // Update the class options in the ClassDataService
          this.classDataService.updateClassOptions(this.classOptions);
        }
      }
  }

  addClass() {
    if (this.classDataService.isElectron == true) {
      this.isAddingClass = true;
    } else {
      const newClassName = prompt('Enter a new class name:');
      if (newClassName) {
        // Add the new class to classOptions
        this.classOptions.push({ label: newClassName, value: newClassName });
        // Update the classOptions in the service
        this.classDataService.updateClassOptions(this.classOptions);
      } else {
        console.log("Failed to update class options")
      }
    }
  }

  submitClass() {
    if (this.newClass.length > 0) {
      // Add the new class to classOptions
      this.classOptions.push({ label: this.newClass, value: this.newClass });
      // Update the classOptions in the service
      this.isAddingClass = !this.isAddingClass;
      if (this.classDataService.isElectron == true) {
        console.log("Updating Class Options: " + this.classOptions)
        this.classDataService.updateClassOptions(this.classOptions);
      }
      this.newClass = "";
    }
  }
}
