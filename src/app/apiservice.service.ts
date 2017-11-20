import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../models/user';
import { Bucket } from '../models/buckets';
import { Item } from '../models/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const api_url = environment.apiUrl;

@Injectable()
export class ApiService {

  headers: any;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('content-type', 'application/json');
  }

  public registerUser(email, password) {
    return this.http
    .post(api_url + '/auth/register',
    JSON.stringify({'email': email, 'password': password}),
    {'headers': this.headers})
    .map(response => {
      return response;
    })
    .catch(this.handleError);
  }

  public logUserIn(email, password) {
    return this.http
    .post(api_url + '/auth/login',
    JSON.stringify({'email': email, 'password': password}),
    {'headers': this.headers})
    .map(response => {
      return response;
    })
    .catch(this.handleError);
  }

  public getAllBuckets(page, per_page, search): Observable<Bucket[]> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.get(api_url + '/bucketlists/?page=' + page + '&per_page=' + per_page + '&q=' + search,
    {'headers': this.headers})
    .map(response => {
      const buckets = response.json();
      return buckets.map((bucket) => new Bucket(bucket));
    })
    .catch(this.handleError);
  }

  public createBucket(name: string): Observable<Bucket> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.post(api_url + '/bucketlists/', JSON.stringify({'name': name}),
    {'headers': this.headers})
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  public getBucketById(id: number): Observable<Bucket> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.get(api_url + '/bucketlists/' + id,
    {'headers': this.headers})
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  public updateBucket(id: number, name: string): Observable<Bucket> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.put(api_url + '/bucketlists/' + id, JSON.stringify({'name': name}),
    {'headers': this.headers})
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  public deleteBucket(id: number): Observable<null> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.delete(api_url + '/bucketlists/' + id,
    {'headers': this.headers})
    .map(response => null)
    .catch(this.handleError);
  }

  public getItems(bucket_id: number): Observable<Item> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.get(api_url + '/bucketlists/' + bucket_id + 'items/',
    {'headers': this.headers})
    .map(response => {
      const items = response.json();
      return items.map((item) => new Item(item));
    })
    .catch(this.handleError);
  }

  public createItem(bucket_id: number, name: string): Observable<Item> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.post(api_url + '/bucketlists/' + bucket_id + 'items/',
    JSON.stringify({'name': name}), {'headers': this.headers})
    .map(response => {
      return new Item(response.json());
    })
    .catch(this.handleError);
  }

  public updateItem(bucket_id: number, item_id: number, name: string): Observable<Item> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.http.put(api_url + '/bucketlists/' + bucket_id + 'items/' + item_id,
    JSON.stringify({'name': name}), {'headers': this.headers})
    .map(response => {
      return new Item(response.json());
    })
    .catch(this.handleError);
  }

  public deleteItem(bucket_id: number, item_id: number, name: string): Observable<Item> {
    const token = localStorage.getItem('access_token');
    this.headers.append('Authorization', token);
    return this.headers.delete(api_url + '/bucketlists/' + bucket_id + 'items/' + item_id)
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error.json());
    return Observable.throw(error.json());
  }
}
