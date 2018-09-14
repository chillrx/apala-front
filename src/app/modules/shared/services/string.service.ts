import { Injectable } from '@angular/core';

@Injectable()
export class StringService {

  constructor() { }

  replaceAll = (string, search, replacement) => {
    return string.replace(new RegExp(search, 'g'), replacement);
  }

}
