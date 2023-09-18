import { Component, Input } from '@angular/core';
import { ClassDataService } from '../class-data.service';

interface Student {
  name: string;
  turtles: number;
  index: number;
}

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent {
  students: Student[] = [];
  averageTurtles: number = 0; // Initialize with a default value
  isEditing: boolean = false;
  @Input() selectedClass: string = 'Default';

  constructor(private classDataService: ClassDataService) {}

  addStudent() {
    let newStudent: Student = { name: 'Student Name', turtles: 4, index: this.students.length };
    let oldLen: number = this.students.length;
    this.classDataService.addStudentToClass(newStudent, this.selectedClass);
    this.students.push(newStudent);
    let newLen: number = this.students.length;

    if (oldLen == (newLen - 2)) {
      this.students.pop();
    } else {
      console.log(this.students);
    }

    this.calculateAverageTurtles();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  increaseTurtles(student: Student) {
    student.turtles = Math.min(6, student.turtles + 1);
    this.calculateAverageTurtles();
  }

  decreaseTurtles(student: Student) {
    student.turtles = Math.max(0, student.turtles - 1);
    this.calculateAverageTurtles();
  }

  ngOnInit() {
    this.classDataService.selectedClassChanged.subscribe((selectedClass: string) => {
      this.selectedClass = selectedClass;
      this.updateStudentsForClass();
    });
    this.calculateAverageTurtles();
  }

  updateStudentsForClass() {
    this.students = this.classDataService.getClassStudents(this.selectedClass);
  }

  calculateAverageTurtles() {
    if (this.students && this.students.length > 0) {
      const totalTurtles = this.students.reduce((sum, student) => sum + student.turtles, 0);
      this.averageTurtles = totalTurtles / this.students.length;
      this.classDataService.setAverageTurtles(this.averageTurtles);
    }
  }
}
