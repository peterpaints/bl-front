import { Component, OnInit } from '@angular/core';
import { Bucket } from '../../models/buckets';
import { ApiService } from '../apiservice.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  newBucket: Bucket = new Bucket();
  bucketlists: Bucket[] = [];
  current_user: string = '';
  access_token: string = '';
  login_status: boolean;
  prev: number;
  current_page: number = 1;
  next: number = this.current_page + 1;
  per_page: number = 12;
  search: string = '';
  temp: number;
  eyed: string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('login_status')) === false) {
      this.router.navigate(['/login']);
    } else {
      this.current_user = localStorage.getItem('current_user');
      this.api.getAllBuckets(this.current_page.toString(), this.per_page.toString(), this.search)
      .subscribe(response => {
        this.bucketlists = response;
      });
    }
  }

  showEditForm() {
    this.eyed = event.srcElement.id;
    let lasttwo = this.eyed.substr(-2);
    $('#bucketname' + lasttwo).toggleClass('hidden');
    $('#form' + lasttwo).toggleClass('hidden');
  }

  addBucket(bucket: Bucket) {
    this.api.createBucket(this.newBucket)
    .subscribe(response => {
      this.bucketlists = this.bucketlists.concat(response);
    });
  }

  editBucket(bucket: Bucket) {
    this.api.updateBucket(bucket)
    .subscribe(response => {
      this.bucketlists = this.bucketlists;
    });
  }

  deleteBucket(bucket: Bucket) {
    this.api.deleteBucket(bucket)
    .subscribe(response => {
      this.bucketlists = this.bucketlists.filter((b) => b.id !== bucket.id);
    });
  }

  nextPage() {
    this.api.getAllBuckets(this.next.toString(), this.per_page.toString(), this.search)
    .subscribe(response => {
      this.bucketlists = response;
    });
    this.temp = this.next;
    this.current_page = this.temp;
    this.prev = this.current_page - 1;
    this.next = this.current_page + 1;
  }

  prevPage() {
    this.api.getAllBuckets(this.prev.toString(), this.per_page.toString(), this.search)
    .subscribe(response => {
      this.bucketlists = response;
    });
    this.temp = this.prev;
    this.current_page = this.temp;
    this.prev = this.current_page - 1;
    this.next = this.current_page + 1;
  }

  // searchBuckets(search: string) {
  //   this.bucketlists = this.bucketlists.filter((b) => b.name.indexOf(search) !== -1);
  // }
  searchBuckets(search: string) {
    this.api.getAllBuckets(this.current_page.toString(), this.per_page.toString(), search)
    .subscribe(response => {
      this.bucketlists = response;
    });
  }
}
