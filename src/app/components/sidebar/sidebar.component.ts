import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/table-list', title: 'Campaigns',  icon: 'ui-1_email-85', class: '' },
    { path: '/users', title: 'Users',  icon:'users_single-02', class: '' },
   /* { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
   { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
   { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },*/

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
