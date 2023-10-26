import { Injectable, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Subject } from 'rxjs';
import { IpcService } from './ipc.service';

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
  classStudents: { [className: string]: Student[] } = {};
  selectedClass: string = "";
  selectedClassChanged = new Subject<string>();
  averageTurtlesChanged = new Subject<number>();
  isElectron: boolean = false;

  classOptions: SelectItem[] = [];

  classOptionsChanged: EventEmitter<any> = new EventEmitter<any>();
  classSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private readonly _ipc: IpcService) {
    if ((<any>window).require) {
      this.initializeConfig();
      this.isElectron = true;
    } else {
      console.log("Not running in Electron");
    }
  }

  async initializeConfig() {
    try {
      const config = await this._ipc.loadConfig();
      console.log('Loaded config:', config);

      if (config) {
        this.selectedClass = config.selectedClass || 'Default';
        this.classOptions = config.classOptions || [];
        this.classStudents = config.classStudents || {};
      } else {
        console.log("Config Initialization Failed");
      }

      // this.setSelectedClass(this.selectedClass);
      this.updateClassOptions(this.classOptions);
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }

  saveConfig() {
    const config = {
      selectedClass: this.selectedClass,
      classOptions: this.classOptions,
      classStudents: this.classStudents
    };

    if(this.isElectron == true) {
      this._ipc.saveConfig(config);
    }
  }

  getClassOptions() {
    return this.classOptions;
  }

  setClassOptions(classOptions: SelectItem[]) {
    this.classOptions = classOptions;
  }

  updateClassOptions(classOptions: SelectItem[]) {
    this.classOptions = classOptions;

     // Check if the selected class exists in the updated classOptions
    const selectedClassExists = this.classOptions.some(option => option.label === this.selectedClass);

    // If the selected class doesn't exist, reset it to an empty string
    if (!selectedClassExists) {
      this.setSelectedClass("")
    }

    console.log(this.classOptions);
    this.classOptionsChanged.emit(this.classOptions);
    this.saveConfig();
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
    this.classSelected.emit(this.selectedClass);
    this.saveConfig();
  }

  setClassStudents(className: string, students: Student[]): void {
    this.classStudents[className] = students;
    this.saveConfig();
  }

  getClassStudents(className: string): Student[] {
    return this.classStudents[className] || [];
  }

  addStudentToClass(student: Student, className: string): void {
    if (!this.classStudents[className]) {
      this.classStudents[className] = [];
    }
    this.classStudents[className].push(student);
    this.saveConfig();
  }

  updateStudentName(className: string, studentIndex: number, newName: string) {
    const students = this.classStudents[className];
    if (students && studentIndex >= 0 && studentIndex <= students.length) {
      students[studentIndex].name = newName;
    }
    this.saveConfig();
  }

  deleteStudentByIndex(className: string, index: number) {
    const students = this.classStudents[className];
    if (students && index >= 0 && index <= students.length) {
      students.splice(index, 1);

      // After deleting a student, reassign the index property for each student
      for (let i = 0; i < students.length; i++) {
        students[i].index = i;
      }
    } else (
      console.log("Failed to delete student")
    )
    this.setSelectedClass(this.selectedClass);
    this.saveConfig();
  }

  updateStudentTurtles(studentIndex: number, newTurtles: number) {
    const students = this.classStudents[this.selectedClass];
    if (students && studentIndex >= 0) {
      console.log("Trying to access index " + studentIndex)
      students[(studentIndex)].turtles = newTurtles;
      console.log(students);
    } else {
      console.log("If statement failed")
    }

    console.log(students)
    this.saveConfig();
  }
}
