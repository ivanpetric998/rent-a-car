export function convertDate(datum: string,vreme:string): Date{
    let datumOdNiz = datum.split("-");
    let vremeOdNiz = vreme.split(":");
    
    return new Date(+datumOdNiz[0],+datumOdNiz[1]-1,+datumOdNiz[2],+vremeOdNiz[0],+vremeOdNiz[1]);
}