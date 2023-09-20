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
  averageTurtles: number = 0;
  isEditing: boolean = false;
  @Input() selectedClass: string = '';
  pageSize: number = 12;
  currentPage: number = 1;
  classSelected: boolean = false;
  displayedStudents: Student[] = [];

  constructor(private classDataService: ClassDataService) {}

  ngOnInit() {
    this.classDataService.classSelected.subscribe((selectedClass: string) => {
      this.selectedClass = selectedClass;
      if (this.selectedClass == "") {
        this.classSelected = false;
        console.log("Class Deselected");
      } else {
        this.classSelected = true;
        console.log("Class Selected");
      }
      this.updateStudentsForClass();
      this.calculateAverageTurtles();
    });
    this.calculateAverageTurtles();
    this.paginateStudents();
  }

  addStudent() {
    if(this.classDataService.selectedClass.length > 1) {
      console.log(this.classDataService.selectedClass)
      let newStudent: Student = { name: 'Student Name', turtles: 4, index: this.students.length };
      let oldLen: number = this.students.length;
      if (this.classDataService.isElectron = true) {
        this.classDataService.addStudentToClass(newStudent, this.selectedClass);
      }
      this.students.push(newStudent);
      let newLen: number = this.students.length;

      if (oldLen == (newLen - 2)) {
        this.students.pop();
      } else {
        console.log(this.students);
      }

      this.calculateAverageTurtles();
      this.paginateStudents();
    }
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

  updateStudentsForClass() {
    this.students = this.classDataService.getClassStudents(this.selectedClass);
    this.paginateStudents();
  }

  calculateAverageTurtles() {
    if (this.students && this.students.length > 0) {
      const totalTurtles = this.students.reduce((sum, student) => sum + student.turtles, 0);
      this.averageTurtles = totalTurtles / this.students.length;
      this.classDataService.setAverageTurtles(this.averageTurtles);
    } else {
      this.classDataService.setAverageTurtles(0);
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.paginateStudents();
  }

  private paginateStudents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedStudents = this.students.slice(startIndex, endIndex);
  }
}
