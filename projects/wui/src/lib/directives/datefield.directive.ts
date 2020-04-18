import { Directive, ElementRef, AfterViewInit, Input, ContentChild, Renderer2 } from '@angular/core';
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[wuiDatefield]'
})
export class DatefieldDirective implements AfterViewInit{

  @Input() datepicker: DatepickerComponent;
  @Input() format: string = 'yyyy-MM-dd';

  constructor(
    private el: ElementRef,
    private host: FormFieldComponent,
    private datePipe: DatePipe
  ) { }

  ngAfterViewInit() {
    let node = document.createElement("span");
    node.classList.add('mdi','mdi-calendar-range-outline');
    node.addEventListener('click', (e) => {
      let val = this.host.getValue();
      this.datepicker.open((val?val:'')).then(date => {
        if (this.host.formControl) {
          this.host.formControl.control.setValue(this.datePipe.transform(date, this.format));
          this.host.detectFloat();
        } else if (this.host.ngModel) {
          this.host.ngModel.control.setValue(this.datePipe.transform(date, this.format));
          this.host.detectFloat();
        }else {
          this.host.inputElement.value = date;
          this.host.detectFloat();
        }
      });
    });
    this.el.nativeElement.appendChild(node);
    this.el.nativeElement.classList.add('datefield');
  }

}
