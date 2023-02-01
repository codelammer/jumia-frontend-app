import { Component, OnInit, HostListener } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { NationalityService } from 'src/app/services/nationality.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  page: number = 0;
  genders: string[] = ["none", "male", "female"];
  selectedGender: string = "none";
  selectedNationality = "none";
  //currently the only offered countries in randomuser.me api
  nationalitiesCodes: string[] = ["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IN", "IR", "MX", "NL", "NO", "NZ", "RS", "TR", "UA", "US"];
  nationalities: any[] = [{name: {common: "none"}, cca2: "none"}];
  results: number = 10;
  users: User[] = [];
  spinner: boolean = false;
  
  constructor (private usersService: UsersService, private nationalityService: NationalityService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchCountryNames();
  }

  fetchUsers(): void{
    this.spinner = true;
    this.usersService.fetchUsers(this.page, this.results)
    .subscribe({
        next: (res: any )=> {
          //console.log(res);
          this.users = this.page == 0 ? res.results : [...this.users, ...res.results];//reset users after filters
          this.spinner = false;
          //console.log(this.users);
        },
        error: (err) => {
          this.spinner = false;
          console.error(err);
        }
      });
  }

  onExportFormat(e: string): void{
    //console.log(e);
    //add 1 to page before multiply due to the api starting from page 0
    let totalUsers: number = ((this.page + 1) * this.results);
    this.usersService.exportUsers(e, 0, totalUsers).subscribe({
      next: (res) => {
        //console.log(res);
        this.downloadButtonPush(res, e);
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }

  
  downloadButtonPush(data: any, format: string): void{
    //create a virtual element that invokes download 
    const a = document.createElement('a');
    const blob = new Blob([data], { type: `text/${format}` });
    const url = window.URL.createObjectURL(blob);
    const date = new Date();
    a.href = url;
    //save file with current timestamp
    a.download = `myFile-${date.toString()}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  fetchCountryNames(): void{
    this.spinner = true;
    this.nationalityService.getCountryNames(this.nationalitiesCodes)
    .subscribe({
        next: (res: any )=> {
          //console.log(res);
          this.spinner = false;
          this.nationalities = [...this.nationalities, ...res];
        },
        error: (err) => {
          this.spinner = false;
          console.error(err);
        }
      });
  }

  changeGender(){
    // console.log(this.selectedGender);
    if (this.selectedGender == "none") {
      this.page = 0;
      this.fetchUsers();
      return;
    }
    let totalUsers: number = ((this.page + 1) * this.results);
    this.spinner = true;
    this.usersService.fetchUsers(this.page, totalUsers, { gender: this.selectedGender})
    .subscribe({
      next: (res: any )=> {
          console.log(res);
          this.users = res.results;
          this.spinner = false;
        },
        error: (err) => {
          this.spinner = false;
          console.error(err);
        }
      });

  }

  changeNationality(){
    //console.log(e.source.value);
    if (this.selectedNationality == "none") {
      this.page = 0;
      this.fetchUsers();
      return;
    }
    let totalUsers: number = ((this.page + 1) * this.results);
    this.spinner = true;
    this.usersService.fetchUsers(0, totalUsers, { nat: this.selectedNationality })
    .subscribe({
      next: (res: any )=> {
          this.page++;
          this.users = res.results;
          this.spinner = false;
        },
        error: (err) => {
          this.spinner = false;
          console.error(err);
        }
      });    
  }
 
  resetFields(): void{
    this.selectedGender = "none";
    this.selectedNationality = "none";
    this.page = 0;
    this.fetchUsers();
  }

  //
  // INFINITY SCROLL
  //
  
  //listen to the main document scroll event
  @HostListener("window:scroll", ['$event'])
  onScrollBody(e: any): void {
    if((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
      this.onScroll();      
    }
  }


  // listen to wrappe scroll (out of focus on resize)
  onScrollWrapper(e: any){
    if((e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight){
      this.onScroll();
    }
  }

  //main scroll function
  onScroll(){
    this.page ++;
    if (this.selectedGender != "none" ) {
      this.changeGender();
    }else if(this.selectedGender != "none" ){
      this.changeNationality();
    }else{
      console.log("fetched users");
      this.fetchUsers();
    }
  }

}
