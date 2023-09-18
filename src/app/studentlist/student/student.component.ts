import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClassDataService } from 'src/app/class-data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @Input() studentName: string;
  @Input() turtles: number;
  @Input() isEditing: boolean;
  @Input() index: number;
  originalStudentName: string;

  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();

  turtleIcons: any[] = [];

  constructor(private classDataService: ClassDataService) {}

  ngOnInit() {
    for (let i = 0; i < this.turtles; i++) {
      this.turtleIcons.push({});
    }

    this.originalStudentName = this.studentName;
  }

  increaseTurtles() {
    if (this.turtles < 6) {
      this.turtles++;
      this.turtleIcons.push({});
      this.increase.emit();
    }
  }

  decreaseTurtles() {
    if (this.turtles > 0) {
      this.turtles--;
      this.turtleIcons.pop();
      this.decrease.emit();
    }
  }

  updateStudentNameInService(newName: string) {
    let className = this.classDataService.getSelectedClass();
    this.classDataService.updateStudentName(className, this.index, newName);
    this.originalStudentName = newName;
  }

  deleteStudent() {
    const className = this.classDataService.getSelectedClass();
    this.classDataService.deleteStudentByIndex(className, this.index);
  }
}
