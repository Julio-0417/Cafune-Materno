import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens';
import { Usuarios } from '../model/Usuarios';
import { AlertasService } from '../service/alertas.service';
import { GruposService } from '../service/grupos.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-minhas-postagens',
  templateUrl: './minhas-postagens.component.html',
  styleUrls: ['./minhas-postagens.component.css']
})
export class MinhasPostagensComponent implements OnInit {

  postagens: Postagens = new Postagens()
  listaPostagens: Postagens[]
  idUser: number
  key = 'data'
  reverse = true
  user: Usuarios = new Usuarios()

  constructor(
    private gruposService: GruposService,
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou!')
      this.router.navigate(['/home'])
    }
    this.gruposService.refreshToken()
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUsuario()
  }

  findByIdUsuario(){
    this.gruposService.findByIdUsuario(this.idUser).subscribe((resp: Usuarios) => {
      this.user = resp
    })
  }


}
