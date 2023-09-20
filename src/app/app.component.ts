import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'turtleometer';
}
