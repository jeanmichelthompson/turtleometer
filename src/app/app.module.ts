import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { StudentComponent } from './studentlist/student/student.component';
import { GaugeComponent } from './gauge/gauge.component';

import { NgxGaugeModule } from 'ngx-gauge';
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentlistComponent,
    StudentComponent,
    GaugeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxGaugeModule,
    ToolbarModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    ChipsModule,
    DynamicDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
