import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private ipc: IpcRenderer
  constructor(){
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  openModal(){
    console.log("Open a modal");
    this.ipc.send("openModal");
  }

   // Save configuration settings
   saveConfig(config: any) {
    this.ipc.send('saveConfig', config);
  }

  // Load configuration settings
  loadConfig() {
    this.ipc.send('loadConfig');
    return new Promise<any>((resolve, reject) => {
      this.ipc.on('configLoaded', (event, config) => {
        resolve(config);
      });
    });
  }
}
