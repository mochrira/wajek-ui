import { ChangeDetectorRef, forwardRef, Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

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
export class DynamicSelectComponent implements ControlValueAccessor, OnInit {

  @Output() valueChanges: EventEmitter<any> = new EventEmitter();
  _value: any;
  set value(value: any) { 
    this._value = value; 
    this.valueChanges.next(value);
    this.onChange(value);
    this.onTouch(value);
  }
  get value() { return this._value; }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  @Input('initialItem') set setInitialItem(item) {
    this.selectItem(item);
  }
  
  selectedItem: any;
  @Output() onSelectItem: EventEmitter<any> = new EventEmitter();
  selectItem(item) {
    this.selectedItem = item;
    this.value = item?.value;
    this.show = false;    
    this.onSelectItem.next(this.selectedItem);
  }
 
  _isFocus = false;
  top = 0;
  left = 0;
  width = 0;
  @HostBinding('class.show') show = false;
  @Output('onFocus') onFocus: EventEmitter<any> = new EventEmitter();
  @ViewChild('input', {read: ElementRef}) input: ElementRef;
  @Input() placeholder: string = '';
  inputFocus(e) { this._isFocus = true; this.show = true; this.inputKeyup(e); this.onFocus.next(true); }
  inputBlur(e) { 
    setTimeout(() => { 
      this.show = false;
      if(this.selectTrigger == 'click') {
        this.input.nativeElement.focus();
        this.show = false;
      } else {
        this._isFocus = false;
        this.onFocus.next(false);
      }
    }, 200); 
  }

  showLoading = false;
  openLoading() { this.showLoading = true; this.cd.detectChanges(); }
  closeLoading() { setTimeout(() => {this.showLoading = false; this.cd.detectChanges();}, 500); }

  _selectedIndex = -1;
  keyup: Subject<any> = new Subject();
  @Input('data') data: any = [];
  inputKeyup(e) {
    if(e.keyCode == 13) {
      // enter
      e.preventDefault();
      this.selectTrigger = 'key';
      if(this.data.length > 0) {
        this.selectItem(this.data[this._selectedIndex]);
      } else {
        this.addNewCallback(e.target.value);
      }
      return false;
    }

    if(e.keyCode == 38) {
      // panah atas
      e.preventDefault();
      if(!this.showLoading && (this.data.length > 0 || this.addNewCallback)) {
        if(this._selectedIndex > 0) {
          this._selectedIndex--;
        }
      }
      return false;
    }

    if(e.keyCode == 40) {
      // panah bawah
      e.preventDefault();
      if(!this.showLoading && (this.data.length > 0 || this.addNewCallback)) {
        if((this.data.length > 0 && this._selectedIndex < this.data.length - 1) || (this.addNewCallback && this._selectedIndex == -1)) {
          this._selectedIndex++;
        }
      }
      return false;
    }

    this.data = [];
    this._selectedIndex = -1;
    this.selectTrigger = 'key';
    this.show = true;
    this.openLoading();
    this.keyup.next(e);
    return false;
  }

  selectTrigger = 'key';
  itemClick(item) {
    this.selectTrigger = 'click';
    this.selectItem(item);
  }

  @Input('dataCallback') dataCallback: any;
  private unsub: Subject<any> = new Subject();
  ngOnInit() {
    this.keyup.pipe(debounceTime(500), takeUntil(this.unsub)).subscribe(async e => {
      if(this.dataCallback) {
        try {
          this.openLoading();
          this.data = await this.dataCallback(e.target.value);
          this.closeLoading();
        } catch(e) {
          this.closeLoading();
        }
      }
    });
  }

  @Input('addNewLabel') addNewLabel: string;
  @Input('addNewCallback') addNewCallback: any;

}
