import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  page: number = 0;
  results: number = 10;
  users: User[] = [];
  
  constructor (private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void{
    this.usersService.fetchUsers(this.page, this.results)
    .subscribe({
        next: (res: any )=> {
          console.log(res);
          this.users = res.results;
          console.log(this.users);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
 
}
