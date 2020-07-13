import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { SearchHelperService } from '../search-helper/search-helper.service.';
import { and, comparison, eq } from "rsql-builder";

@Directive({
  selector: '[lookUp]',
})
export class LookUpDirective implements OnInit {

  @Input('lookUp') lookUp: any;

  constructor(
    private el: ElementRef,
    private shService: SearchHelperService
  ) { }

  doesExsist(value: string) {
    const searchKey: string = this.lookUp['key'];
    const queryStr = and(comparison(searchKey, eq(value)));
    this.shService.getMapWithoutView(searchKey, queryStr).subscribe(
      res => {
        this.lookUp['callback'](res);
      }
    )
  }

  @HostListener("change", ["$event.target.value"])
  onChange(value) {
    if (value) {
      this.doesExsist(value);
    }
  }


  ngOnInit() {
  }
}

// @HostListener("window:focus", ["$event.target"])
// onFocus(target) {
//   console.log('focus', target.value)
// }

// @HostListener("window:keydown", ["$event.target"])
// onClick(target) {
//   console.log('keydown', target.value)
// }

// @HostListener("blur", ["$event.target"])
// onBlur(target) {
//   console.log(target.value)

// }
// @HostListener("window:input", ["$event.target.value"])
// onInput(value) {
//   console.log('input', value)

// }
