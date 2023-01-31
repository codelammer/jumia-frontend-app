import { trigger, transition, animate, style } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('100ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({transform: 'translateY(-100%)'}))
      ])      
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menu: boolean = false;

  ngOnInit(){
      if (window.innerWidth > 992) {
        this.menu = true;
      }
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    if (window.innerWidth > 992) {
      this.menu = true;
    }else{
      this.menu = false;
    }
  }
}
