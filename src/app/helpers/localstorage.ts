import { IPeriodIzdavanja } from './../interfaces/IPeriodIzdavanja';

export function getPeriodIzdavanjaLS(){
    return JSON.parse(localStorage.getItem("periodIzdavanja"));
}

export function setPeriodIzdavanjaLS(obj: IPeriodIzdavanja){
    localStorage.setItem("periodIzdavanja", JSON.stringify(obj));
}

export function removeLS(){
    localStorage.removeItem("periodIzdavanja");
}