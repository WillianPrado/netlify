import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private apiUrl = '/.netlify/functions/getLeads'; // URL da sua função Lambda
  private acceptUrl = '/.netlify/functions/acceptLead'; // URL da função Lambda para aceitar leads

  constructor(private http: HttpClient) {}

  // Método para buscar os leads usando a função Lambda do Netlify
  getLeads(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }
  // Método para aceitar um lead
  acceptLead(id: number): Observable<any> {
    return this.http.post<any>(this.acceptUrl, { id }, { withCredentials: true });
  }
}
