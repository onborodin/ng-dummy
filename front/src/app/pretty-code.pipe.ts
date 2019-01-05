import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyCode'
})
export class PrettyCodePipe implements PipeTransform {

  transform(value: string, period: number = 3) : string  {
    var result: string = ''
    value.split('').forEach((char, i) => {
        if (i / period === Math.round(i / period) && i > 0) {
            result += '-'
        }
        result += char
    })
    return result
  }
}
