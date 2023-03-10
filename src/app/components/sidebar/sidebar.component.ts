import { trigger, transition, animate, style } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

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
  spinner: boolean = false;
  dummyLoggedInUser: User = {} as User;

  constructor(private usersService: UsersService){}

  ngOnInit(): void{
      if (window.innerWidth > 992) {
        this.menu = true;
      }
      this.fetchDummyLoggedInUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    //always show nav on screens greater than 992px
    if (window.innerWidth > 992) {
      this.menu = true;
    }else{
      this.menu = false;
    }
  }

  fetchDummyLoggedInUser(): void{
    this.spinner = true;
    this.usersService.dummyLoggedInUser()
    .subscribe({
        next: (res: any )=> {
          this.dummyLoggedInUser = res.results[0];
          this.spinner = false;
          console.log(res);
        },
        error: (err) => {
          this.spinner = false;
          console.error(err);
        }
      });
  } 



}
