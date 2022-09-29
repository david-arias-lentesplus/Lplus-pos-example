import { Component, Input, OnInit } from '@angular/core';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-pos-plugin',
  templateUrl: './pos-plugin.component.html',
  styleUrls: []
})
export class PosPluginComponent implements OnInit {
  
  @Input() info:any;

  status: boolean = false;
  usbPrintDriver: UsbDriver;

  constructor(private printService: PrintService) {

    this.usbPrintDriver = new UsbDriver();
    this.printService.isConnected.subscribe(result => {
        this.status = result;
        if (result) {
            console.log('Connected to printer!!!');
        } else {
        console.log('Not connected to printer.');
        }
    });

  }

  ngOnInit(): void {    
  }

  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
        this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    });
  }

  print() {
    var ESC = '\x1B'; //ESC byte in hex notation
    var LF = '\x0A'; //LF byte in hex notation
    var GS = '\x1D'; //GS byte in hex notation
    var HT = '\x09'; //HT byte in hex notation

    // --- Initial setting --->>>

    var cmds = ESC + "@"; //Initializes the printer (ESC @)
    cmds += ESC + "D" + '\x33\x35' + '\x30'; // Select justification: Centering
    // --- Initial setting ---<<<

    cmds += ESC + "a" + '\x31'; // Select justification: Centering
    cmds += ESC + "!" + '\x32'; //Emphasized + Double-height + Double-width mode selected
    cmds += `${this.info[0].code}`
    cmds += LF + LF;

    // --- Print barcode --->>>
    
    cmds += ESC + "a" + '\x30';
    cmds += ESC + "!" + '\x00'; //Character font A selected (ESC ! 0)
    cmds += "nombre:" + HT + ` ${this.info[0].userInfo.name}` + LF;
    cmds += "direccion:" + HT + ` ${this.info[0].userInfo.dir}` + LF;
    cmds += LF;

    // --- Print barcode ---<<<

    // --- Print barcode --->>>

    cmds += ESC + "a" + '\x31'; // Select justification: Centering
    cmds += ESC + "J" + "\x31\x35";
    cmds += GS + "h" + "\x35\x30";
    cmds += GS + "H" + "\x32";
    cmds += GS + "f" + "\x31";
    cmds += GS + "k" + '\x34\x2A' + `${this.info[0].code}` + '\x2A \x30';;

    // --- Print barcode ---<<<

//     var cmds = esc + "@"; //Initializes the printer (ESC @)
// cmds += esc + '!' + '\x38'; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
// cmds += 'BEST DEAL STORES'; //text to print
// cmds += newLine + newLine;
// cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
// cmds += 'COOKIES                   5.00'; 
// cmds += newLine;
// cmds += 'MILK 65 Fl oz             3.78';
// cmds += newLine + newLine;
// cmds += 'SUBTOTAL                  8.78';
// cmds += newLine;
// cmds += 'TAX 5%                    0.44';
// cmds += newLine;
// cmds += 'TOTAL                     9.22';
// cmds += newLine;
// cmds += 'CASH TEND                10.00';
// cmds += newLine;
// cmds += 'CASH DUE                  0.78';
// cmds += newLine + newLine;
// cmds += esc + '!' + '\x18'; //Emphasized + Double-height mode selected (ESC ! (16 + 8)) 24 dec => 18 hex
// cmds += '# ITEMS SOLD 2';
// cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
// cmds += newLine + newLine;
// cmds += '11/03/13  19:53:17';

    this.printService.init()
        .setSize('normal')
        .writeLine(cmds)
        .feed(4)
        .cut('full')
        .flush();
  }

 

}
