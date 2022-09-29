import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diopBySkufull'
})
export class DiopBySkufullPipe implements PipeTransform {

  transform(value: string, ...args: any[]): unknown {    
    let diop = value.split('_');    
    let type = args[0];
    let rtrn = "";

    switch ( type ) {
      case 'Esfera':
        rtrn = diop[1] ;
        break;
      case 'Cyl':
        rtrn = diop[2] ;
        break;
      case 'Axis':
        rtrn = diop[3] ;
        break;
        
      default:
        rtrn = "-" ;
        break;
    }    
    return rtrn;
  }

}
