import { IKorisnik } from './IKorisnik';
import { IPeriodIzdavanja } from './IPeriodIzdavanja';

export interface IRezervacija{
    id:number,
    periodIzdavanja:IPeriodIzdavanja,
    korisnik:IKorisnik,
    idAuto:number
}