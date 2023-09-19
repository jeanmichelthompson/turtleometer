import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Subject } from 'rxjs';

interface Student {
  name: string;
  turtles: number;
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClassDataService {
  private averageTurtles: number = 0;
  private classStudents: { [className: string]: Student[] } = {};
  private selectedClass: string = 'Default';
  selectedClassChanged = new Subject<string>();
  averageTurtlesChanged = new Subject<number>();

  classOptions: SelectItem[] = [
    { label: '8th Grade World Perspectives', value: '8th Grade World Perspectives' },
    { label: 'Test', value: 'Test' },
  ];

  updateClassOptions(classOptions: SelectItem[]) {
    this.classOptions = classOptions;
  }

  getAverageTurtles(): number {
    return this.averageTurtles;
  }

  setAverageTurtles(value: number): void {
    this.averageTurtles = value;
    this.averageTurtlesChanged.next(value);
  }

  getSelectedClass(): string {
    return this.selectedClass;
  }

  setSelectedClass(className: string): void {
    this.selectedClass = className;
    this.selectedClassChanged.next(className);
  }

  setClassStudents(className: string, students: Student[]): void {
    this.classStudents[className] = students;
  }

  getClassStudents(className: string): Student[] {
    return this.classStudents[className] || [];
  }

  addStudentToClass(student: Student, className: string): void {
    if (!this.classStudents[className]) {
      this.classStudents[className] = [];
    }
    this.classStudents[className].push(student);
  }

  updateStudentName(className: string, studentIndex: number, newName: string) {
    const students = this.classStudents[className];
    if (students && studentIndex >= 0 && studentIndex < students.length) {
      students[studentIndex].name = newName;
    }
  }

  deleteStudentByIndex(className: string, index: number) {
    const students = this.classStudents[className];
    if (students && index >= 0 && index < students.length) {
      students.splice(index, 1);
    }
    this.setSelectedClass(this.selectedClass);
  }
}
