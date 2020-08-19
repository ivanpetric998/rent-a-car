import { IAutomobil } from './../interfaces/IAutomobil';
import { IPeriodIzdavanja } from './../interfaces/IPeriodIzdavanja';
import { IRezervacija } from './../interfaces/IRezervacija';
import { JsonPaths } from './../helpers/json_paths';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { convertDate } from '../helpers/datetime';

@Injectable({
  providedIn: 'root'
})
export class AutomobilService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(JsonPaths.automobil);
  }

  getZauzeteAutomobile(rezervacije: IRezervacija[], period: IPeriodIzdavanja): number[]{

    let datumOd = convertDate(period.datumOd,period.vremeOd);
    let datumDo = convertDate(period.datumDo,period.vremeDo);

    let rez = rezervacije.filter(x => {
      let datumRezervacijeOd = convertDate(x.periodIzdavanja.datumOd,x.periodIzdavanja.vremeOd);
      let datumRezervacijeDo = convertDate(x.periodIzdavanja.datumDo,x.periodIzdavanja.vremeDo);
      return datumRezervacijeOd <= datumOd && datumOd <= datumRezervacijeDo
      || datumRezervacijeOd <= datumDo && datumDo <= datumRezervacijeDo
    });

    rezervacije.forEach(x => {
      let datum = convertDate(x.periodIzdavanja.datumOd,x.periodIzdavanja.vremeOd);
      if(datumOd <= datum && datum <= datumDo) rez.push(x);
    });

    let carIds = [];

    rez.forEach(x => carIds.push(x.idAuto))

    return carIds.filter((value,index,self) => self.indexOf(value) == index)

  }

  getSlobodneAutomobile(automobili: IAutomobil[], idsZauzeti: number[]): IAutomobil[]{

      if(idsZauzeti.length == 0) return automobili;
      return automobili.filter(x => !idsZauzeti.includes(x.id));

  }

  getOneAuto(data: IAutomobil[], id: number): IAutomobil{
    return data.filter(x => x.id == id)[0];
  }

  getAutomobile(data: IAutomobil[], ids: number[]): IAutomobil[]{
    return data.filter(x => {
      return ids.includes(x.id);
    });
  }
}
