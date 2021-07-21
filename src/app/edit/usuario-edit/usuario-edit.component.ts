import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/model/Userlogin';
import { Usuarios } from 'src/app/model/Usuarios';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { GruposService } from 'src/app/service/grupos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  user: Usuarios = new Usuarios()
  foto: string
  idUser: number
  show: boolean
  pwdType = 'password'
  usuarioAtualizado: Usuarios = new Usuarios()
  loading = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupos: GruposService,
    private usuarios: UsuariosService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
  }
  this.idUser = this.route.snapshot.params['id']
  this.foto = environment.foto
  this.findByUsuario()
  environment.email = this.user.email

  }

  findByUsuario() {
    this.grupos.findByIdUsuario(this.idUser).subscribe((resp: Usuarios) => {
      this.user = resp
    })
  }

  atualizar() {
    this.loading = true
    this.usuarioAtualizado.idUsuario = this.user.idUsuario
    this.usuarioAtualizado.nomeCompleto = this.user.nomeCompleto
    this.usuarioAtualizado.senha = this.user.senha
    this.usuarioAtualizado.foto = this.user.foto
    this.usuarioAtualizado.status = this.user.status
    this.usuarioAtualizado.sobre = this.user.sobre
    this.usuarioAtualizado.localizacao = this.user.localizacao
    this.usuarioAtualizado.pronome = this.user.pronome
    this.usuarioAtualizado.email = this.user.email

    this.usuarios.putUsuario(this.usuarioAtualizado).subscribe((resp: Usuarios) => {
      this.loading = false
        this.user = resp
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.email = ''
  })

  }

  showPass() {

    this.show = !this.show
    this.pwdType = this.show ? 'password' : 'text'


  }

}
