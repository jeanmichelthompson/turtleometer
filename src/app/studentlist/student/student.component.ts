import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClassDataService } from 'src/app/class-data.service';
import { AudioService } from 'src/app/audio.service';

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

  constructor(private classDataService: ClassDataService, private audioService: AudioService) {}

  ngOnInit() {
    console.log(this.studentName + ": " + this.turtles + " Turtles")
    for (let i = 0; i < this.turtles; i++) {
      this.turtleIcons.push({});
    }

    this.originalStudentName = this.studentName;
  }

  increaseTurtles() {
    if (this.turtles < 6) {
      console.log("Pre-Addition: " + this.turtles);
      this.turtles++;
      console.log("Post-Addition: " + this.turtles);
      this.turtleIcons.push({});
      this.classDataService.updateStudentTurtles(this.index, this.turtles);
      this.increase.emit();
    }

    const randomSound = Math.random() < 0.5 ? 'assets/increase.wav' : 'assets/increase2.wav';
    this.audioService.playSound(randomSound);
  }

  decreaseTurtles() {
    if (this.turtles > 0) {
      console.log("Pre-Subtraction: " + this.turtles);
      this.turtles--;
      console.log("Post-Subtraction: " + this.turtles);
      this.turtleIcons.pop();
      this.classDataService.updateStudentTurtles(this.index, this.turtles);
      this.decrease.emit();
    }

    const randomSoundIndex = Math.floor(Math.random() * 3); // Generates 0, 1, or 2
    const randomSounds = ['assets/decrease.wav', 'assets/decrease2.wav', 'assets/decrease3.wav'];
    const randomSound = randomSounds[randomSoundIndex];

    this.audioService.playSound(randomSound);
  }

  updateStudentNameInService(newName: string) {
    let className = this.classDataService.getSelectedClass();
    console.log("This student index: " + this.index)
    this.classDataService.updateStudentName(className, this.index, newName);
    this.originalStudentName = newName;
  }

  deleteStudent() {
    const className = this.classDataService.getSelectedClass();
    this.classDataService.deleteStudentByIndex(className, (this.index));
  }
}
