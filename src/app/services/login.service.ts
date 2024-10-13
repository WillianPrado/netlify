import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://primorossi.directlead.com.br/Acesso/Entrar';

  constructor(private http: HttpClient) {}

  login(cpf: string, senha: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('cpf', cpf);
    formData.append('senha', senha);
    // return this.http.post<any>('/api/login', formData);
    var result = this.http.post<any>('https://cors-anywhere.herokuapp.com/https://primorossi.directlead.com.br/Acesso/Entrar', formData);


    var result =  this.http.post<any>('/api/Acesso/Entrar', formData);
    console.log(result)
    return result
  }
}
