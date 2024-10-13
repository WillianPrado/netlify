import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = '/.netlify/functions/login'; // URL da sua função Lambda

  constructor(private http: HttpClient) {}

  login(cpf: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Altera para application/json
    });

    // Constrói o corpo como um objeto JSON
    const body = JSON.stringify({
      cpf: cpf,
      senha: senha
    });

    return this.http.post(this.apiUrl, body, { headers }); // Envia o corpo como JSON
  }
}
