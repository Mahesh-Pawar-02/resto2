import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  users: any
  contacts: any
  hotels: any
  constructor(private _http: HttpClient, private _router: Router,
    private toastr: ToastrService, private api: ApiService) { }

  ngOnInit(): void {
    this.users = []
    this.hotels = []
    this.contacts = []
    this.getUsers()
    this.getHotels()
    this.getContacts()
  }

  getUsers() {
    this.api.getUsers().subscribe((res: any) => {
      this.users = res.users
    })
  }
  getContacts() {
    this.api.getContacts().subscribe((res: any) => {
      this.contacts = res.contacts
    })
  }
  getHotels() {
    this.api.getHotels().subscribe((res: any) => {
      this.hotels = res.hotels
    })
  }

  deleteHotel(id: number) {
    const data = {
      id: id
    }
    this.api.deleteHotel(data).subscribe((res: any) => {
      this.toastr.success(res.msg);
      this.getHotels();
    })
  }

  deleteUser(email: any) {
    const data = {
      email:email
    }
    this.api.deleteUser(data).subscribe((res: any) => {
      this.toastr.success(res.msg);
      this.getUsers();
    })
  }

  deleteContact(email: any) {
    const data = {
      email:email
    }
    this.api.deletContact(data).subscribe((res: any) => {
      this.toastr.success(res.msg);
      this.getContacts();
    })
  }

  goBack() {
    this._router.navigate(['/restaurent']);
  }

}
