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

  onExportFormat(e: string): void{
    console.log(e);
    //add 1 to page before multiply due to the api starting from page 0
    let totalUsers: number = ((this.page + 1) * this.results);
    this.usersService.exportUsers(e, 0, totalUsers).subscribe({
      next: (res) => {
        console.log(res);
        this.downloadButtonPush(res, e);
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }

  
  downloadButtonPush(data: any, format: string): void{
    const a = document.createElement('a');
    const blob = new Blob([data], { type: `text/${format}` });
    const url = window.URL.createObjectURL(blob);
    const date = new Date();
    a.href = url;
    a.download = `myFile-${date.toString()}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
 
}
