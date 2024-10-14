import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = '/.netlify/functions/login'; // URL da sua função Lambda

  constructor(private http: HttpClient) {}

  login(cpf: string, senha: string): Observable<any> {
    // Configura os cabeçalhos completos
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',  // Certifique-se de que a API aceita esse tipo de dado
      // Outros cabeçalhos como tokens de autenticação, se necessário
    });

    // Constrói o corpo da requisição como um objeto JSON
    const body = JSON.stringify({
      cpf: cpf,
      senha: senha
    });

    // Faz a requisição POST com os cabeçalhos definidos
    return this.http.post(this.apiUrl, body, { headers });
  }
}
