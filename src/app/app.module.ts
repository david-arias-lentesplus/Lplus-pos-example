import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxPrintElementModule } from 'ngx-print-element';

import { ThermalPrintModule } from 'ng-thermal-print';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PosHtmlComponent } from './components/pos-html/pos-html.component';
import { DiopBySkufullPipe } from './pipes/diop-by-skufull.pipe';
import { PosPluginComponent } from './components/pos-plugin/pos-plugin.component';
import { PosNodePluginComponent } from './components/pos-node-plugin/pos-node-plugin.component';

@NgModule({
  declarations: [
    AppComponent,
    PosHtmlComponent,
    DiopBySkufullPipe,
    PosPluginComponent,
    PosNodePluginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgxBarcodeModule,
    NgxPrintElementModule,
    ThermalPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
