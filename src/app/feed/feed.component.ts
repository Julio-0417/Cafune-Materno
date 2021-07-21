import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupos } from '../model/Grupos';
import { Postagens } from '../model/Postagens';
import { Usuarios } from '../model/Usuarios';
import { AlertasService } from '../service/alertas.service';
import { GruposService } from '../service/grupos.service';
import { PostagemService } from '../service/postagem.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postagens: Postagens = new Postagens()
  grupos: Grupos = new Grupos()
  usuarios: Usuarios = new Usuarios()
  listaGrupos: Grupos[]
  listaPostagens: Postagens[]
  idUsuario = environment.idUserLogin
  loading = false
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private gruposService: GruposService,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.router.navigate(['/home'])
      this.alertas.showAlertInfo('É necessário logar novamente')
    }
    this.gruposService.refreshToken()
    this.postagemService.refreshToken()
    this.findAllGrupos()
    this.findAllPostagens()
  }


  findAllGrupos() {
    this.gruposService.getAllGrupos().subscribe((resp: Grupos[]) => {
      this.listaGrupos = resp
    })
  }

  findAllPostagens() {
    this.gruposService.getAllPostagens().subscribe((resp: Postagens[]) => {
      this.listaPostagens = resp
    })
  }


  cadastrar() {
    this.loading = true
    if (this.grupos.nomeGrupo.length >= 5 && this.grupos.tema.length >= 5
      && this.grupos.nomeGrupo.length <= 45 && this.grupos.tema.length <= 45) {
      this.gruposService.postGrupos(this.grupos, environment.idUserLogin).subscribe((resp: Grupos) => {
        this.loading = false
        this.grupos = resp
        this.alertas.showAlertSuccess('Grupo cadastrado com sucesso!')
        this.grupos = new Grupos()
        this.findAllGrupos()
      })

    } else {
      this.alertas.showAlertDanger('O nome e tema do grupo precisam ter entre 5 e 45 caracteres')
    }

  }

  postar() {
    this.loading = true
    if (this.postagens.tituloPostagem.length >= 5 && this.postagens.descricaoPostagem.length >= 5
      && this.postagens.descricaoPostagem.length <=255 && this.postagens.tituloPostagem.length <= 45) {
        this.gruposService.postPostagem(this.postagens, environment.idUserLogin).subscribe((resp: Postagens) => {
        this.loading = false
        this.postagens = resp
        this.alertas.showAlertSuccess("Postagem cadastrada com sucesso!")
        this.postagens = new Postagens()
        this.findAllPostagens()
      })
    } else {
      this.alertas.showAlertDanger("É necessário que o título tenha mais do que 5 caracteres e a postagem deve ter entre 5 e 255 caracteres.")
    }

  }

  entrarGrupo(grupo: Grupos) {
    console.log(grupo.idGrupo)
    this.loading = true
    this.gruposService.addGrupo(environment.idUserLogin, grupo.idGrupo).subscribe((resp: Usuarios) => {
      this.loading = false
      this.usuarios = resp
      this.alertas.showAlertSuccess('Adicionado com sucesso')
    })
  }

  verificarUser() {

    let ok: boolean = false
    if (this.usuarios.tipo == "adm") {
      ok = true
    } else {
      ok = false
    }
    return ok
  }

  verificaUsuarioGrupo(grupo: Grupos) {

    if(!this.usuarios.listaGrupos) return true;
    let ok: boolean = true
    //console.log(this.usuarios.listaGrupos.includes(grupo))
    //return this.usuarios.listaGrupos.includes(grupo)
    for (let i = 0; i < this.usuarios.listaGrupos.length; i++) {
      if (this.usuarios.listaGrupos[i].idGrupo == grupo.idGrupo) {
        ok = false
        return ok
      }
    }
    return ok
  }

  verificaNull(postagem: Postagens){
    let ok: boolean = false
    if (postagem.grupoPertencente == null) {
      ok = true
    }
    return ok
  }

  deleteGrupo(grupo: Grupos) {
    this.loading = true
    if (grupo.listaParticipantes.length == 0) {
      this.gruposService.deleteGrupos(grupo.idGrupo).subscribe(()=>{
            this.loading = false
            this.alertas.showAlertSuccess("Grupo apagado com sucesso")
            this.ngOnInit()
        //this.findAllGrupos()
      })

    } else {
      this.alertas.showAlertDanger("Não é possível excluir um grupo com membros ativos")
    }
  }

  findUsuarioId() {
    return this.gruposService.findByIdUsuario(this.idUsuario).subscribe((resp: Usuarios) => {
      this.usuarios = resp
    })
  }
}




