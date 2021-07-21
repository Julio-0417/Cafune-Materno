import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-menu-feed',
  templateUrl: './menu-feed.component.html',
  styleUrls: ['./menu-feed.component.css']
})
export class MenuFeedComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  idUser = environment.idUserLogin

  constructor(
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/home'])
    }

    }
    sair() {
      this.router.navigate(['/home'])
      environment.token =  ''
      environment.nome = ''
      environment.foto = ''
      environment.idUserLogin = 0
  }

}
