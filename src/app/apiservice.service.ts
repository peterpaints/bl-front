import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
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

  constructor(private http: Http) {}

  public registerUser(email, password) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http
    .post(api_url + '/auth/register',
    JSON.stringify({'email': email, 'password': password}),
    options)
    .map(response => {
      return response.json();
    })
    .catch(this.handleError);
  }

  public logUserIn(email, password) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http
    .post(api_url + '/auth/login',
    JSON.stringify({'email': email, 'password': password}),
    options)
    .map(response => {
      return response.json();
    })
    .catch(this.handleError);
  }

  public getAllBuckets(page, per_page, search): Observable<Bucket[]> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(
      api_url + '/bucketlists/?page=' + page + '&per_page=' + per_page + '&q=' + search, options)
      .map(response => {
        const buckets = response.json();
        return buckets.map((bucket) => new Bucket(bucket));
      })
      .catch(this.handleError);
  }

  public createBucket(bucket: Bucket): Observable<Bucket> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(api_url + '/bucketlists/', JSON.stringify({'name': bucket.name}),
    options)
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  public getBucketById(id: number): Observable<Bucket> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api_url + '/bucketlists/' + id,
    options)
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  public updateBucket(bucket: Bucket): Observable<Bucket> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(api_url + '/bucketlists/' + bucket.id, JSON.stringify({'name': bucket.name}),
    options)
    .map(response => {
      return new Bucket(response.json());
    })
    .catch(this.handleError);
  }

  public deleteBucket(bucket: Bucket): Observable<null> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(api_url + '/bucketlists/' + bucket.id,
    options)
    .map(response => null)
    .catch(this.handleError);
  }

  public getItems(bucket: Bucket): Observable<Item> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api_url + '/bucketlists/' + bucket.id,
    options)
    .map(response => {
      const as_json = response.json();
      const items = as_json.items;
      return items.map((item) => new Item(item));
    })
    .catch(this.handleError);
  }

  public createItem(item: Item, bucket: Bucket): Observable<Item> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(api_url + '/bucketlists/' + bucket.id + '/items',
    JSON.stringify({'name': item.name}), options)
    .map(response => {
      return new Item(response.json());
    })
    .catch(this.handleError);
  }

  public updateItem(bucket_id: number, item_id: number, name: string): Observable<Item> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(api_url + '/bucketlists/' + bucket_id + '/items' + item_id,
    JSON.stringify({'name': name}), options)
    .map(response => {
      return new Item(response.json());
    })
    .catch(this.handleError);
  }

  public deleteItem(bucket_id: number, item_id: number, name: string): Observable<Item> {
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(api_url + '/bucketlists/' + bucket_id + '/items' + item_id, options)
    .map(response => {
      return new Item(response.json());
    })
    .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error.json());
    return Observable.throw(error.json());
  }
}
