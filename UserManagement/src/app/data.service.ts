import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  token = {};
  constructor(private http: HttpClient) {
    this.getAccessToken().subscribe((response)=>
    {
      this.token = response.accessToken;
    });
  }

  getAccessToken(): Observable<{accessToken:string}> {
    return this.http.post<{accessToken:string}>('http://localhost:3000/accessToken', {});
  }
  
  getUser(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>('http://localhost:3000/users/get-list', {headers});
  }

  createUser(user: object): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      })
    };
    const content = JSON.stringify(user);

    return this.http.post<any[]>('http://localhost:3000/users/create-and-get-list', content, httpOptions);
  }

  deleteUser(index: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      })
    };
    const content = { index };

    return this.http.post<any[]>('http://localhost:3000/users/delete-and-get-list', content, httpOptions);
  }
}
