import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cpf: string = '';
  senha: string = '';
  loginError: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.loginService.login(this.cpf, this.senha).subscribe(
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
        this.loginError = 'Falha ao acessar o servidor. Tente novamente mais tarde.';
      }
    );
  }
}
