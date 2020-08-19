import { IRezervacija } from './../interfaces/IRezervacija';
import { IPeriodIzdavanja } from './../interfaces/IPeriodIzdavanja';
import { JsonPaths } from './../helpers/json_paths';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { convertDate } from '../helpers/datetime';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(JsonPaths.rezervacije);
  }

  daLiJeSlobodanAuto(rezervacije: IRezervacija[], period: IPeriodIzdavanja, idAuto:number): boolean{

      let datumOd = convertDate(period.datumOd,period.vremeOd);
      let datumDo = convertDate(period.datumDo,period.vremeDo);

      rezervacije = rezervacije.filter(x => x.idAuto == idAuto);

      if(rezervacije.length == 0) return true;

      let rez1 = rezervacije.filter(x => {
        let datumRezervacijeOd = convertDate(x.periodIzdavanja.datumOd,x.periodIzdavanja.vremeOd);
        let datumRezervacijeDo = convertDate(x.periodIzdavanja.datumDo,x.periodIzdavanja.vremeDo);
        return datumRezervacijeOd < datumOd && datumOd < datumRezervacijeDo
      });

      if(rez1.length) return false;

      let rez2 = rezervacije.filter(x => {
        let datumRezervacijeOd = convertDate(x.periodIzdavanja.datumOd,x.periodIzdavanja.vremeOd);
        let datumRezervacijeDo = convertDate(x.periodIzdavanja.datumDo,x.periodIzdavanja.vremeDo);
        return datumRezervacijeOd < datumDo && datumDo < datumRezervacijeDo
      });

      if(rez2.length) return false;

      let rez3 = rezervacije.filter(x => {
        let datum = convertDate(x.periodIzdavanja.datumOd,x.periodIzdavanja.vremeOd);
        return datumOd < datum && datum < datumDo;
      });

      if(rez3.length) return false;

      return true;

  }

  
}