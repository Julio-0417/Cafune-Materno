import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupos } from '../model/Grupos';

import { Usuarios } from '../model/Usuarios';
import { GruposService } from '../service/grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: Grupos = new Grupos()
  usuarios: Usuarios = new Usuarios()
  listaGrupos: Grupos[]


  constructor(
    private router: Router,
    private gruposService: GruposService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
      this.router.navigate(['/home'])
    }
    this.gruposService.refreshToken()
    this.findAllGrupos()
  }

  findAllGrupos(){
    this.gruposService.getAllGrupos().subscribe((resp: Grupos[])=> {
      this.listaGrupos = resp
    })
  }






  cadastrar() {
    this.gruposService.postGrupos(this.grupos, environment.idUserLogin).subscribe((resp: Grupos) => {
      this.grupos = resp
      alert('Grupo cadastrado com sucesso!')
      this.findAllGrupos()
      this.grupos = new Grupos()
    })
  }



  entrarGrupo(grupo: Grupos) {
    console.log(grupo.idGrupo)
    this.gruposService.addGrupo(environment.idUserLogin, grupo.idGrupo ).subscribe((resp)=>{
      this.usuarios = resp
      alert('Adicionado com sucesso')
    })
  }


  sairGrupo(grupo: Grupos) {
    console.log(grupo.listaParticipantes.length)
    this.gruposService.removerGrupo(environment.idUserLogin, grupo.idGrupo ).subscribe((resp)=>{
      this.usuarios = resp
      alert('Removido com sucesso')
    })
  }

  verificaUsuarioGrupo(grupo: Grupos) {
    return grupo.listaParticipantes.indexOf(this.usuarios) == -1

 }

}
