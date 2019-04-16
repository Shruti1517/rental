import { Component, OnInit,Input,AfterViewInit } from '@angular/core';
import{ LandlordService } from '../../_services/landlord.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from '../../mygloabal';

@Component({
  selector: 'app-land-nav',
  templateUrl: './land-nav.component.html',
  styleUrls: ['./land-nav.component.css']
})
export class LandNavComponent implements OnInit,AfterViewInit {
public profilephoto:any;
public userInfo:any;
url=Url;
@Input() childMessage:any;
  constructor(private router:Router,public landlordService: LandlordService) { 

    this.userInfo=JSON.parse(localStorage.getItem("currentUser"));
    this.profilephoto= this.userInfo.userinfo.profilephoto;   
     console.log(this.profilephoto);
  }
  ngAfterViewInit(){
  
     
  }

  ngOnInit() {
    
    console.log('hiiiiii');
    this.userInfo=JSON.parse(localStorage.getItem("currentUser"));
    this.profilephoto= this.userInfo.userinfo.profilephoto;   
     console.log(this.profilephoto);
  

    this.getNotification();
   
  }
  // profilePhoto(){
  //   console.log('hiiiiii');
  //   this.userInfo=JSON.parse(localStorage.getItem("currentUser"));
  //   this.profilephoto= this.userInfo.userinfo.profilephoto;   
  //    console.log(this.profilephoto);
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getNotification()
  {
      this.landlordService.getNotification().subscribe((data)=>{
        console.log(data);
      })  
  }
}
