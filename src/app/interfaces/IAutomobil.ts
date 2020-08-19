import { IGrupa } from './IGrupa';
import { IGorivo } from './IGorivo';
import { IMenjac } from './IMenjac';

export interface IAutomobil{
        id: number,
        naziv: string,
        menjac: IMenjac,
        gorivo: IGorivo,
        grupa: IGrupa,
        brojSedista: number,
        brojVrata: number,
        brojKofera: number,
        karakteristike: string[],
        opis: string,
        cena: number,
        malaSlika: string,
        velikaSlika: string
}