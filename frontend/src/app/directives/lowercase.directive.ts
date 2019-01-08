import { Directive, HostListener } from '@angular/core'
import { DefaultValueAccessor } from '@angular/forms'

@Directive({
    selector: 'input[lowercase]',
})
export class LowercaseDirective extends DefaultValueAccessor {

    @HostListener('input', [ '$event.target.value' ])
    onInput(value: any) {
        const transformed = this.transformValue(value)
        super.writeValue(transformed)
    }

    private transformValue(value: any): any {
        var result = value
        if (typeof value === 'string')
            result = value.toLowerCase()
        return result
    }
}
