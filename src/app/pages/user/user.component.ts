import { Component, OnInit } from '@angular/core';
import { NavService } from '@wajek/wui';
import { RouterService } from '@wajek/wui';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private routerService: RouterService,
    private navService: NavService
  ) {}

  async goToControl() {
    this.routerService.navigate('/user/1/control');
  }

  ngOnInit() {
    this.routerService.routeParams.subscribe(param => {
      console.log(param);
    });
  }

}
