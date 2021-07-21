import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/Userlogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()
  show: boolean
  pwdType = 'password'
  loading = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {
    this.loading = true
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.loading = false
      this.userLogin = resp
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.idUserLogin = this.userLogin.idUserLogin

      this.router.navigate(['/feed'])
    }, erro => {
      if (erro.status == 401) {
        this.alertas.showAlertDanger('E-mail ou senha estão incorretos!')
      }
    })
  }

  showPass() {

    this.show = !this.show
    this.pwdType = this.show ? 'password' : 'text'

  }

}
