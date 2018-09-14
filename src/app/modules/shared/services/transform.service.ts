import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  constructor() { }

  dateConversion(date: any): any {
    const newDate = new Date(date);
    const day = Number(newDate.getDate());
    let finalDate;
    const month = Number(newDate.getMonth()) + 1;
    let finalMonth;

    (month < 10) ? finalMonth = '0' + month : finalMonth = month;
    (day < 10) ? finalDate = '0' + day : finalDate = day;

    finalDate += 1;

    return (finalDate + '/' + finalMonth + '/' + newDate.getFullYear());
  }

  replaceAll(str, search, replacement) {
    const result = str.replace(search, replacement);
    if (result.includes(search)) return this.replaceAll(result, search, replacement);
    return result;
  }

}
