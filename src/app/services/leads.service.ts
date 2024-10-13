import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private apiUrl = 'https://primorossi.directlead.com.br/Leads/LeadSemVendedor';
  private acceptUrl = 'https://primorossi.directlead.com.br/Leads/Aceitar';



  // Método para buscar os leads
  constructor(private http: HttpClient) {}

  // Método para buscar os leads
  getLeads(): Observable<any> {
    return this.http.post<any>('/api/Leads/LeadSemVendedor', { withCredentials: true });
  }

  // Método para aceitar um lead com base no ID
  acceptLead(id: number): Observable<any> {
    return this.http.post<any>(`/api/Leads/Aceitar?id=${id}`, {}, { withCredentials: true });
  }
}
