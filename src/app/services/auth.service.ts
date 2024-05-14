import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { HttpService } from './http.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
    ) { }
    login(postData: any): Observable<any> {
      return this.httpService.post('login', postData);
      }
      signup(postData: any): Observable<any> {
        return this.httpService.post('signup', postData);
      }
        
      logout() {
         this.storageService.clear();
        this.storageService.remove(AuthConstants.AUTH);
          this.router.navigate(['/login']);
        
      }
      

}
