import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private apiUrl = 'https://primorossi.directlead.com.br/Leads/LeadSemVendedor';
  private acceptUrl = 'https://primorossi.directlead.com.br/Leads/Aceitar';


  constructor(private http: HttpClient) {}

  // Método para buscar os leads
  getLeads(): Observable<any> {
    // const headers = new HttpHeaders({
    //   'authority': 'primorossi.directlead.com.br',
    //   'cookie': 'ASP.NET_SessionId=iqtfbog1psgsrk34oq0b0r4l' // Atualize o cookie conforme necessário
    // });

    return this.http.get<any>('/api/Leads/LeadSemVendedor', { withCredentials: true });

  }

  // Método para aceitar um lead com base no ID
  acceptLead(id: number): Observable<any> {
    // const headers = new HttpHeaders({
    //   'authority': 'primorossi.directlead.com.br',
    //   'cookie': 'ASP.NET_SessionId=iqtfbog1psgsrk34oq0b0r4l' // Atualize o cookie conforme necessário
    // });

    // return this.http.post<any>(`/api/Leads/Aceitar?id=778415`, {}, { withCredentials: true });
    return this.http.post<any>(`/api/Leads/Aceitar?id=${id}`, {}, { withCredentials: true });
  }
}
