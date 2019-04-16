import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from '../../mygloabal';
@Component({
  selector: 'app-tenant-nav',
  templateUrl: './tenant-nav.component.html',
  styleUrls: ['./tenant-nav.component.css']
})
export class TenantNavComponent implements OnInit {
 public profilephoto:any;
 url=Url;
  constructor(private router:Router) { 

    
    let userInfo= JSON.parse(localStorage.getItem('currentUser'));
   this.profilephoto=userInfo.userinfo.profilephoto;

  }

  ngOnInit() {
  }

  
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
}
}
