import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false

  redirectUrl!: string;
  private currentUserSubject: BehaviorSubject<User>
  currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

  login({email, username}, password): Observable<User> {
    return this.http.post<any>('localhos:6000/login', {{username, email}, password})
  }
}
