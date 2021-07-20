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
    this.grupoService.removerGrupo(environment.idUserLogin, grupo.idGrupo ).subscribe((resp: Usuarios)=>{
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
    console.log(this.postagens)
    if (this.postagens.tituloPostagem.length >= 5 && this.postagens.descricaoPostagem.length >= 5) {
      this.postagens.grupoPertencente = this.grupo
      this.postagemService.postPostagem(this.postagens, this.idUser).subscribe((resp: Postagens)=>{
        this.postagens = resp
        this.alertas.showAlertSuccess("Postagem realizada com sucesso!")
        this.postagens = new Postagens()
        this.findAllPostagem()
      })
    } else {
      this.alertas.showAlertDanger("É necessário que o titulo e a postagem tenham mais de 5 caracteres")
    }

  }

  findAllPostagem() {
    return this.postagemService.getAllPostagens().subscribe((resp: Postagens[])=>{
      this.listaPostagens = resp
    })
  }
}
