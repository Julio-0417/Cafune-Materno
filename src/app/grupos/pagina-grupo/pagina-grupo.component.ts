import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupos } from 'src/app/model/Grupos';
import { Postagens } from 'src/app/model/Postagens';
import { Usuarios } from 'src/app/model/Usuarios';
import { AlertasService } from 'src/app/service/alertas.service';
import { GruposService } from 'src/app/service/grupos.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-pagina-grupo',
  templateUrl: './pagina-grupo.component.html',
  styleUrls: ['./pagina-grupo.component.css']
})
export class PaginaGrupoComponent implements OnInit {

  grupo: Grupos = new Grupos()
  usuarios: Usuarios = new Usuarios()
  idUsuario: number
  idGrupo: number
  qtdMembros: number
  postagens: Postagens = new Postagens()
  novaPostagem: Postagens = new Postagens()
  loading = false
  key =  'data'
  reverse = true
  loadingPublicar = false
  idUser: number

  listaPostagens: Postagens[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GruposService,
    private postagemService: PostagemService,
    private alertas: AlertasService

  ) { }

  ngOnInit()  {
    window.scroll(0, 0)
    if(environment.token == '') {
      this.router.navigate(['/home'])
      this.alertas.showAlertInfo('É necessário logar novamente')
    }
    this.idUsuario = environment.idUserLogin
    this.idGrupo = this.route.snapshot.params['id']
    this.findByIdGrupo(this.idGrupo)
    this.findByUsuario(this.idUsuario)
    this.idUser = environment.idUserLogin
    this.findAllPostagem()
  }

  findByIdGrupo(id: number) {
      this.grupoService.getById(id).subscribe((resp: Grupos)=>{
      this.grupo = resp
      this.qtdMembros = this.grupo.listaParticipantes.length
    })
  }

  findByUsuario(idUsuario: number){
    return this.grupoService.findByIdUsuario(idUsuario).subscribe((resp: Usuarios)=>{
      this.usuarios = resp
    })
  }

  findAllPostagens(){
    this.grupoService.getAllPostagens().subscribe((resp: Postagens[])=> {
      this.listaPostagens = resp
    })
  }

  sairGrupo(grupo: Grupos) {
    this.loading = true
    this.grupoService.removerGrupo(environment.idUserLogin, grupo.idGrupo ).subscribe((resp: Usuarios)=>{
      this.loading = false
      this.usuarios = resp
      this.alertas.showAlertSuccess('Removido com sucesso')
      this.router.navigate(['/feed'])
    })
  }

  publicar() {
    this.novaPostagem.tituloPostagem = this.postagens.tituloPostagem
    this.novaPostagem.descricaoPostagem = this.postagens.descricaoPostagem
    this.novaPostagem.urlAnexo = this.postagens.urlAnexo
    this.grupoService.postPostagem(this.novaPostagem, environment.idUserLogin).subscribe((resp: Postagens) => {
      this.postagens = resp
      this.alertas.showAlertSuccess('Postagem cadastrado com sucesso!')
      this.postagens = new Postagens()

    })
    this.listaPostagens

  }

  verificarUser() {
    let ok : boolean = false
    if(this.usuarios.tipo == "adm") {
      ok = true
    } else {
      ok = false
    }
    return ok
  }

  cadastrarPostagem() {
    this.loadingPublicar = true
    if (this.postagens.tituloPostagem.length >= 5 && this.postagens.descricaoPostagem.length >= 5
      && this.postagens.descricaoPostagem.length <=255 && this.postagens.tituloPostagem.length <= 45) {
      this.postagens.grupoPertencente = this.grupo
      this.postagemService.postPostagem(this.postagens, this.idUser).subscribe((resp: Postagens)=>{
        this.loadingPublicar = false
        this.postagens = resp
        this.alertas.showAlertSuccess("Postagem realizada com sucesso!")
        this.postagens = new Postagens()
      })
    } else {
      this.alertas.showAlertDanger("É necessário que o título tenha mais do que 5 caracteres e a postagem deve ter entre 5 e 255 caracteres.")
    }

  }

  findAllPostagem() {
    return this.postagemService.getAllPostagens().subscribe((resp: Postagens[])=>{
      this.listaPostagens = resp
    })
  }
}
