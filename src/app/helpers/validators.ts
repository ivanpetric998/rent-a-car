import { FormControl, ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { convertDate } from './datetime';

export function datumValidator(control: FormControl): {[s: string]: boolean}{

    if(control.value == null) return null;

    let datumNow = new Date();
    let datumDanas = new Date(datumNow.getFullYear(),datumNow.getMonth(),datumNow.getDate());

    let datumZaProveru = new Date(control.value);

    if(datumDanas.getTime() > datumZaProveru.getTime()) return {"datumValidator" :true};
    return null;

}
 
export function vremeValidator(control: FormControl): {[s: string]: boolean}{

    if(control.value == null) return null;

    let sat = parseInt(control.value.split(":")[0]);

    if (sat >= 8 && sat <= 18) return null;

    return {"vremeValidator" :true};
}

export const dateCompererValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

    let datumOd = control.get('datumOd');
    let datumDo = control.get('datumDo');

    if(!datumOd.valid || !datumDo.valid) return null;
  
    let datum1 = new Date(datumOd.value);
    let datum2 = new Date(datumDo.value);
  
    if(datum1.getTime() < datum2.getTime()) return null;
  
    return {"datumDoNijeUDobromFormatu": true};

}

export function patternValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let test = !nameRe.test(control.value);
      return test ? {patternValidator: {value: control.value}} : null;
    };
}