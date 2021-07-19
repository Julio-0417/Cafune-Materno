import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuarios } from '../model/Usuarios';
import { AlertasService } from '../service/alertas.service';
import { GruposService } from '../service/grupos.service';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.css']
})
export class PaginaUsuarioComponent implements OnInit {

  user: Usuarios = new Usuarios()
  foto: string
  id: number


  constructor(
    private router: Router,
    private gruposervice: GruposService,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
        this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
  }
  this.id = this.route.snapshot.params['id']
  this.foto = environment.foto
  this.findByUsuario()
  }

  findByUsuario(){
    this.gruposervice.findByIdUsuario(this.id).subscribe((resp: Usuarios) => {
      this.user = resp
    })
  }
}
