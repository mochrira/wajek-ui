import { Directive, ElementRef, AfterViewInit, Input, ContentChild, Renderer } from '@angular/core';
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';

@Directive({
  selector: '[wuiDatefield]'
})
export class DatefieldDirective implements AfterViewInit{

  @Input() datepicker: DatepickerComponent;

  constructor(
    private el: ElementRef,
    private host: FormFieldComponent
  ) { }

  ngAfterViewInit() {
    let node = document.createElement("span");
    node.classList.add('mdi','mdi-calendar-range-outline');
    node.addEventListener('click', (e) => {
      let val = this.host.getValue();
      this.datepicker.open((val?val:'')).then(date => {
        if (this.host.formControl) {
          this.host.formControl.control.setValue(date);
          this.host.detectFloat();
        } else if (this.host.ngModel) {
          this.host.ngModel.control.setValue(date);
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
