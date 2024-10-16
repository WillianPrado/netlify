import { Component, OnInit,Renderer2 } from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  leads: any[] = [];
  triggerMessage : string = ''

  constructor(private leadsService: LeadsService,private loginService: LoginService,private renderer: Renderer2) {}

  ngOnInit(): void {
    this.atualizarHorario();
    this.login()
    this.getLeads();
    // this.triggerAtSpecificTime(6, 28, 59);

    this.triggerAtSpecificTime(7, 58, 59, 'login');
    this.triggerAtSpecificTime(7, 59, 58);

  }
  private intervalId: any;
  public isAutomaticallyFetchingLeads: boolean = false;

  getLeads(): void {
      this.leadsService.getLeads().subscribe(
      (response) => {
        console.log('Leads obtidos com sucesso:', response);
        this.leads = response; // Armazena os leads recebidos
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
  
  async acceptAllLeads(): Promise<void> {
    const firstSevenLeadIds = this.leads.map(lead => lead.Id).slice(0, 10); // Coleta apenas os primeiros 7 IDs dos leads
    
    const acceptPromises = firstSevenLeadIds.map(id => 
      this.leadsService.acceptLead(id).toPromise()
        .then(result => ({ status: 'fulfilled', id, result: result }))
        .catch(error => ({ status: 'rejected', id, error }))
    );
  
    var results = await Promise.all(acceptPromises);
  
    results.forEach(result => {
        const lead = this.leads.find(l => l.Id === result.id);
        if ('result' in result && result.result?.message) {
          console.log(result.id +" "+result.result.message); 
        }
        if (lead && 'result' in result) {
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
      this.triggerMessage = "Ativo para cada 15 segundos";
      this.intervalId = setInterval(() => {
        this.dispararFuncao(); // Função que será disparada a cada 15 segundos
      }, 15000); // Dispara a cada 15.000ms (15 segundos)
    }
  }

  // Função que será disparada a cada minuto
  dispararFuncao() {
    const agora = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo', // Define o fuso horário de Brasília
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const horaBrasilia = new Intl.DateTimeFormat('pt-BR', options).format(agora);
    console.log('Função disparada a cada 1 minuto!' + horaBrasilia);
    this.getLeads() 
    this.acceptAllLeads();
    this.triggerMessage = "A cada 15 segundos, ultimo disparo as: " + horaBrasilia
    // Adicione aqui o que você quer que aconteça a cada minuto
  }

  triggerAtSpecificTime(hour: number, minute: number, second: number, triggerType: string = '' ) {
    const now = new Date(); // Current date and time
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second); // Target time
    console.log("preparado para o desparo as: " + targetTime)
    if (triggerType != 'login'){
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo', // Define o fuso horário de Brasília
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const horaBrasilia = new Intl.DateTimeFormat('pt-BR', options).format(targetTime);
      this.triggerMessage = "Captura de leads programada para as: " + horaBrasilia
    }

    let timeUntilTrigger = targetTime.getTime() - now.getTime(); // Calculate the remaining time in milliseconds

    // If the remaining time is negative, it means the target time has passed for today, so schedule it for tomorrow
    if (timeUntilTrigger < 0) {
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour, minute, second);
      timeUntilTrigger = tomorrow.getTime() - now.getTime();
    }

    console.log(`Trigger scheduled in ${timeUntilTrigger / 1000} seconds (${timeUntilTrigger} ms)`);
    
    setTimeout(() => {
      if(triggerType == 'login'){
        this.functionToTriggerLoginAtTime()
      }else{
        
        this.functionToTriggerAtTime();

      }
       // Function to be triggered at the exact time
    }, timeUntilTrigger);
  }
  functionToTriggerLoginAtTime() {
    const agora = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo', // Define o fuso horário de Brasília
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const horaBrasilia = new Intl.DateTimeFormat('pt-BR', options).format(agora);
    console.log('Function triggered at the specific time!');
    console.log('Hora: ' + horaBrasilia)
    this.login()
    // Add here the logic you want to execute at the specific time
  }
  // Function that will be triggered at the specific time
  functionToTriggerAtTime() {
    const agora = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo', // Define o fuso horário de Brasília
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const horaBrasilia = new Intl.DateTimeFormat('pt-BR', options).format(agora);
    console.log('Function triggered at the specific time!');
    console.log('Hora: ' + horaBrasilia)
    this.acceptAllLeads()
    // Add here the logic you want to execute at the specific time
  }
}
