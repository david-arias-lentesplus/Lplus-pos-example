import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  // showPos:boolean = false;


  posInfo:any = [
    {
      code: "1234567890",
      order: "1234567890",
      userInfo: {
        name: "Arcadio Solorzano",
        phone: "3215609139",
        dir: "Conjunto Residencial Quintas del Norte. Mz B Casa 39",
        region: "Risaralda",
        city: "Santa Rosa de Cabal"
      },
      totalProds: 2,
      prods: [
        {
          name: "1-Day Acuvue Moist con LACREON",
          ean: "8473256873465823465876342985762",
          sku: "21JJAC122",
          sku_full: "21JJAC122_-3.75",
          use_type_id: 1,
          qty: 1,
          order: "0000987654321",
          orderType: "cross docking",
        },
        {
          name: "1-Day Acuvue Moist para Astigmatismo con LACREON",
          ean: "8473256873465823465876342985762",
          sku: "21JJAC123",
          sku_full: "21JJAC123_-3.00_-0.75_110",
          use_type_id: 2,
          qty: 1,
          order: "0000987654321",
          orderType: "cross docking",
        },
        {
          name: "Opti-Free Puremoist Rewetting Drops 10ml",
          ean: "8473256873465823465876342985762",
          sku: "23ALOF106",
          sku_full: "23ALOF106",
          use_type_id: 6,
          qty: 1,
          order: "0000987654321",
          orderType: "cross docking",
        }
      ]
    },
    {
      code: "0987654321",
      order: "1234567890",
      userInfo: {
        name: "Alejandro Alejandro Ruiz",
        phone: "3133942496",
        dir: "Altos del jardin casa 46",
        region: "Santander",
        city: "Bucaramanga"
      },
      totalProds: 3,
      prods: [
        {
          name: "AIR OPTIX Plus HydraGlyde",
          ean: "8473256873465823465876342985762",
          sku: "21JJAC122",
          sku_full: "21ALAO121_+3.00",
          use_type_id: 1,
          qty: 1,
          order: "0000987654321",
          orderType: "cross docking",
        },
        // {
        //   name: "Dailies AquaComfort Plus x30",
        //   ean: "8473256873465823465876342985762",
        //   sku: "21ALDL101",
        //   sku_full: "21ALDL101_+3.00",
        //   use_type_id: 1,
        //   qty: 1,
        //   order: "0000987654321",
        //   orderType: "cross docking",
        // },
        // {
        //   name: "Opti-Free Puremoist Rewetting Drops 10ml",
        //   ean: "8473256873465823465876342985762",
        //   sku: "23ALOF106",
        //   sku_full: "23ALOF106",
        //   use_type_id: 6,
        //   qty: 1,
        //   order: "0000987654321",
        //   orderType: "cross docking",
        // }
      ]
    }
  ]

  constructor() { }
}
