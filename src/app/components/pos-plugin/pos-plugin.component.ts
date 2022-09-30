import { Component, Input, OnInit } from '@angular/core';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { GeneralService } from 'src/app/services/general.service';

let ThermalPrinterEncoder = require('thermal-printer-encoder');
let encoder = new ThermalPrinterEncoder({
  language: 'esc-pos'
});

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

    this.usbPrintDriver = new UsbDriver( 1155, 22304 );
    this.usbPrintDriver.connect();
    this.status = true;

    // this.printService.isConnected.subscribe(result => {
    //     this.status = result;
    //     if (result) {
    //         console.log('Connected to printer!!!');
    //     } else {
    //     console.log('Not connected to printer.');
    //     }
    // });

  }

  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
        this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    });
  }

  ngOnInit(): void {
  }

  encode_barcode( code:string, order:string ) {
    return encoder
    .initialize()

    .align('center')
    .barcode(`${code}`, 'code128', 60)
    .newline()
    .size('normal')
    .align('center')
    .bold(true)
    .line(`Pedido #: ${order}`)
    .bold(false)
    .newline()

    .encode();
  }
  encode_userInfo( userInfo:any ) {
    return encoder
    .initialize()

    .line('------------------------------------------------')
    .newline()
    .align('left')
    .line('nombre:')
    .bold(true)
    .line(`${userInfo.name}`)
    .bold(false)
    .line('Direccion:')
    .bold(true)
    .line(`${userInfo.dir}`)
    .bold(false)
    .line('Ciudad:')
    .bold(true)
    .line(`${userInfo.city}`)
    .bold(false)
    .newline()
    .line('------------------------------------------------')

    .encode();
  }
  getEncodeDiop( prodUseType:any, skuFull:any ) {
    let diop = skuFull.split('_');

    if ( prodUseType === 1 ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('Poder (Esfera):')
      .bold(true)
      .line(`${diop[1]}`)
      .bold(false)
      .line('------------------------------------------------')
  
      .encode();

    } else if ( prodUseType === 2 ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('Poder (Esfera):')
      .bold(true)
      .line(`${diop[1]}`)
      .bold(false)
      .line('Cilindro (Cyl):')
      .bold(true)
      .line(`${diop[2]}`)
      .bold(false)
      .line('Eje (Axis):')
      .bold(true)
      .line(`${diop[3]}`)
      .bold(false)
      .line('------------------------------------------------')
  
      .encode();

    } else if ( prodUseType === 3 ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('Poder (Esfera):')
      .bold(true)
      .line(`${diop[1]}`)
      .bold(false)
      .line('Adicion (add):')
      .bold(true)
      .line(`${diop[2]}`)
      .bold(false)
      .line('------------------------------------------------')
  
      .encode();

    } else if ( prodUseType === 4 ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('Poder (Esfera):')
      .bold(true)
      .line(`${diop[1]}`)
      .bold(false)
      .line('Color:')
      .bold(true)
      .line(`${diop[2]}`)
      .bold(false)
      .line('------------------------------------------------')
  
      .encode();

    } else if ( prodUseType === 6 ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('Solucion')
      .line('------------------------------------------------')
  
      .encode();

    } else if ( prodUseType === 10 ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('Lente oftálmico')
      .line('------------------------------------------------')
  
      .encode();

    } else if ( prodUseType === 7 ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('Marco')
      .line('------------------------------------------------')
  
      .encode();

    } else if ( prodUseType === null || prodUseType === 'null' ) {

      return encoder
      .initialize()
  
      .align('left')
      .line('--')
      .line('------------------------------------------------')
  
      .encode();

    }

  }
  encode_prods( prods:any ) {
    let myArrays = [];
    
    for (let p = 0; p < prods.length; p++) {
      const element = prods[p];      
      myArrays.push( encoder.initialize()

      .newline()
      .align('center')
      .bold(true)
      .line(`${element.name}`)
      .bold(false)
      .line('')
      .align('left')
      .bold(true)
      .line(`SKU: ${element.sku}`)
      .line(`Orden #: ${element.order}`)
      .line(`[${element.orderType}]`)
      .bold(false)

      // .align('center')
      // .barcode(`${element.ean}`, 'ean13', 60)
      // .newline()
      
      .line('')
  
      .encode() );

      myArrays.push( this.getEncodeDiop( element.use_type_id, element.sku_full ) )
    }

    let length = 0;
    myArrays.forEach(item => { length += item.length; });

    let order_prods = new Uint8Array(length);
    let offset = 0;
    
    myArrays.forEach(item => {
      order_prods.set(item, offset);
      offset += item.length;
    });

    return order_prods;
  }
  encode_cut() {
    return encoder
    .initialize()
    .line('')
    .newline()
    .newline()
    .line('')
    .cut('partial')
    .encode();
  }

  compileOrderEncode( item:any ) {

    let myArrays = [
      this.encode_barcode( item.code, item.order ),
      this.encode_userInfo( item.userInfo ),
      this.encode_prods( item.prods ),
      this.encode_cut()
    ];

    let length = 0;
    myArrays.forEach(item => { length += item.length; });

    let order_encode = new Uint8Array(length);
    let offset = 0;
    
    myArrays.forEach(item => {
      order_encode.set(item, offset);
      offset += item.length;
    });

    // console.log( order_encode );
    return order_encode;

  }

  print() {

    for (let i = 0; i < this.info.length; i++) {
      const element = this.info[i];
      // console.log( this.compileOrderEncode( element ) );
      
      this.usbPrintDriver.write( this.compileOrderEncode( element ) )
    }


  }
 

}
