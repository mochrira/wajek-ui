import { ChangeDetectorRef, forwardRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'wui-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DynamicSelectComponent),
    multi: true
  }]
})
export class DynamicSelectComponent implements ControlValueAccessor {

  @Output() onFocus: EventEmitter<any> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onKeyup: EventEmitter<any> = new EventEmitter();
  valueChanges: Subject<any> = new Subject();

  onChange: any = () => {};
  onTouch: any = () => {};

  _value;
  set value(val) {
    this._value = val;
    this.valueChanges.next(val);
    this.onChange(val);
    this.onTouch(val);
  }
  get value() {
    return this._value;
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {    
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  @Input() placeholder: any;
  isFocus = false;
  @Input() debounceTime = 500;

  _data = [];
  @Input() set data(d) {
    this._data = d;
  };
  label = '';
  selectedIndex = -1;
  showOptions = false;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  inputFocus(e) {
    this.isFocus = true;
    this.showOptions = true;
    this.onFocus.emit({component: this, event: e});
  }

  inputBlur(e) {
    console.log(e);
    this.isFocus = false;
    this.showOptions = false;
    this.onBlur.emit({component: this, event: e});
  }

  inputKeyup(e) {
    if(e.keyCode == 13) {
      if(this.selectedIndex > -1) {
        e.preventDefault();
        this.value = this._data[this.selectedIndex];
        this.showOptions = false;
      }
      return;
    }

    if(e.keyCode == 38) {
      e.preventDefault();
      if(this.selectedIndex > 0) {
        this.selectedIndex--;
        if(e.target.setSelectionRange) {
          e.target.focus();
          e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        } else if(e.target.createTextRange) {
          var range = e.target.createTextRange();
          range.move('character', e.target.value.length);
          range.select();
        }
      }
      return;
    }

    if(e.keyCode == 40) {
      e.preventDefault();
      if(this.selectedIndex < this._data.length - 1) {
        this.selectedIndex++;
        if(e.target.setSelectionRange) {
          e.target.focus();
          e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        } else if(e.target.createTextRange) {
          var range = e.target.createTextRange();
          range.move('character', e.target.value.length);
          range.select();
        }
      }
      return;
    }

    this.showOptions = true;
    this.onKeyup.emit({component: this, event: e});
  }

}
