import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateDmy'
})
export class FormatDateDmyPipe implements PipeTransform {

  transform(date: any): any {
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

}
