import { Component, OnInit,Renderer2 } from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-automatic-lead-capture',
  templateUrl: './automatic-lead-capture.component.html',
  styleUrls: ['./automatic-lead-capture.component.css']
})
export class AutomaticLeadCaptureComponent {
  leads: any[] = [];
  triggerMessage : string = ''
  Error :  string = ''
  processedLeadIds: Set<number> = new Set(); 

  constructor(private leadsService: LeadsService,private loginService: LoginService,private renderer: Renderer2) {}

  ngOnInit(): void {
    this.atualizarHorario();
    this.login()
    this.getLeads();
  }

  private intervalId: any;
  public isAutomaticallyFetchingLeads: boolean = false;

  getLeads(): void {
    this.leadsService.getLeads().subscribe(
      (response) => {
        if (Array.isArray(response)) {
          console.log('Response é uma lista.');
          // Atualiza a lista de leads, mas mantém o controle dos já processados
          response.forEach(newLead => {
            if (!this.leads.some(existingLead => existingLead.Id === newLead.Id)) {
              this.leads.push(newLead);
            }
          });
        } else {
          this.Error = "Erro, faça login";
          this.login();
          console.log('Response não é uma lista.');
        }
      },
      (error) => {
        console.error('Erro ao obter os leads:', error);
      }
    );
    // this.leads = 
    // [
    //   {
    //       "Id": 778149,
    //       "Nome": "WANDERSON JOSE DA SILVA",
    //       "Email": "sivawanderson516@gmail.com",
    //       "StatusDescricao": null,
    //       "StatusDescricaoHtml": null,
    //       "DataCadastro": "/Date(1728160502073)/",
    //       "TarefaPendente": null,
    //       "UltimaTarefa": null,
    //       "UltimaTarefaExecutada": null,
    //       "DataOrdenacao": "/Date(-62135589600000)/",
    //       "TipoOrdenacao": 0,
    //       "StatusOrdem": 0,
    //       "Qualificacao": null,
    //       "EmailCamuflado": "si*****16@gmail.com",
    //       "Classe": "quente"
    //   },
    //   {
    //       "Id": 778152,
    //       "Nome": "JOÃO CARLOS PEREIRA",
    //       "Email": "joao.pereira@gmail.com",
    //       "StatusDescricao": null,
    //       "StatusDescricaoHtml": null,
    //       "DataCadastro": "/Date(1728160502084)/",
    //       "TarefaPendente": null,
    //       "UltimaTarefa": null,
    //       "UltimaTarefaExecutada": null,
    //       "DataOrdenacao": "/Date(-62135589600000)/",
    //       "TipoOrdenacao": 0,
    //       "StatusOrdem": 0,
    //       "Qualificacao": null,
    //       "EmailCamuflado": "jo*****ra@gmail.com",
    //       "Classe": "morno"
    //   },
    //   {
    //       "Id": 778153,
    //       "Nome": "MARIA SILVA DE SOUZA",
    //       "Email": "maria.souza@gmail.com",
    //       "StatusDescricao": null,
    //       "StatusDescricaoHtml": null,
    //       "DataCadastro": "/Date(1728160502095)/",
    //       "TarefaPendente": null,
    //       "UltimaTarefa": null,
    //       "UltimaTarefaExecutada": null,
    //       "DataOrdenacao": "/Date(-62135589600000)/",
    //       "TipoOrdenacao": 0,
    //       "StatusOrdem": 0,
    //       "Qualificacao": null,
    //       "EmailCamuflado": "ma*****za@gmail.com",
    //       "Classe": "frio"
    //   }
    // ]
  }

  login(): void {
    this.loginService.login('JOYCEFREITAS', 'Jvf@1985').subscribe(
      (response) => {
        console.log('Login realizado com sucesso', response);
        this.Error = ''
        // // Checa se o login foi bem-sucedido e armazena os cookies/sessão
        // if (response.success) {
        //   document.cookie = `sessionToken=${response.token}; path=/;`;  // Defina o cookie
        //   this.router.navigate(['/dashboard']);  // Navega para outra página após o login
        // } else {
        //   this.loginError = 'CPF ou senha incorretos. Tente novamente.';
        // }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        // this.loginError = 'Falha ao acessar o servidor. Tente novamente mais tarde.';
      }
    );
  }

  acceptLead(id: number): void {
    this.leadsService.acceptLead(id).subscribe(
      (response) => {
        const lead = this.leads.find(l => l.Id === id);
        console.log(`Lead com ID ${id} aceito com sucesso!`, response);
        if (lead && 'Ok' in response) {
            lead.Ok = response.Ok;  // Atualiza o valor de Ok
        }
        // Aqui você pode atualizar a lista de leads ou exibir uma mensagem
      },
      (error) => {
        console.error(`Erro ao aceitar o lead com ID ${id}:`, error);
      }
    );
  }
  
  async acceptAllLeads(leads: any[]): Promise<void> {
    const leadIds = leads.map(lead => lead.Id).slice(0, 8); // Limita aos primeiros 7 IDs
  
    const acceptPromises = leadIds.map(id => 
      this.leadsService.acceptLead(id).toPromise()
        .then(result => ({ status: 'fulfilled', id, result }))
        .catch(error => ({ status: 'rejected', id, error }))
    );
  
    const results = await Promise.all(acceptPromises);
  
    results.forEach(result => {
      const lead = this.leads.find(l => l.Id === result.id);
      if (lead && 'result' in result && result.result?.message) {
        console.log(result.id + " " + result.result.message); 
        lead.Ok = result.result?.Ok;  // Atualiza o valor de Ok
      }
    });
  }

  removeLead(id: number): void {
    this.leads = this.leads.filter(lead => lead.Id !== id);
    console.log(`Lead com ID ${id} removido.`);
  }

  atualizarHorario() {
    setInterval(() => {
      const agora = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo', // Define o fuso horário de Brasília
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const horaBrasilia = new Intl.DateTimeFormat('pt-BR', options).format(agora);
      const relogioElement = document.getElementById('relogio');
      if (relogioElement) {
        relogioElement.innerHTML = horaBrasilia;
      }
    }, 1000); // Atualiza a cada segundo
  }

  startFunction() {
    if (!this.intervalId) { // Garante que só será iniciado uma vez
      this.isAutomaticallyFetchingLeads = true
      this.triggerMessage = "Ativo para cada 2 segundos";
      this.intervalId = setInterval(() => {
        this.dispararFuncao(); // Função que será disparada a cada 15 segundos
      }, 2000); // Dispara a cada 5.000ms (5 segundos)
    }
  }
  stopFunction() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Para o intervalo
      this.intervalId = null; // Redefine o intervalo para evitar múltiplas execuções
      this.isAutomaticallyFetchingLeads = false;
      this.triggerMessage = "Disparos automáticos parados";
      console.log("Disparos automáticos foram interrompidos.");
    }
  }

  // Função que será disparada a cada minuto
  async dispararFuncao() {
    const agora = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const horaBrasilia = new Intl.DateTimeFormat('pt-BR', options).format(agora);
  
    await this.getLeads(); // Atualiza this.leads
  
    // Filtra apenas os leads que ainda não foram processados
    const novosLeads = this.leads.filter(lead => !this.processedLeadIds.has(lead.Id));
  
    // Aceita apenas os novos leads
    if (novosLeads.length > 0) {
      await this.acceptAllLeads(novosLeads);
    }
  
    // Adiciona os IDs dos novos leads à lista de IDs processados
    novosLeads.forEach(lead => this.processedLeadIds.add(lead.Id));
  
    this.triggerMessage = "A cada 2 segundos, último disparo às: " + horaBrasilia;
  }
  
  
}
