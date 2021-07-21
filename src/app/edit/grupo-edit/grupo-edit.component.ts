import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupos } from 'src/app/model/Grupos';
import { AlertasService } from 'src/app/service/alertas.service';
import { GruposService } from 'src/app/service/grupos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-grupo-edit',
  templateUrl: './grupo-edit.component.html',
  styleUrls: ['./grupo-edit.component.css']
})
export class GrupoEditComponent implements OnInit {

  grupo: Grupos = new Grupos()
  grupoAtualizado: Grupos = new Grupos()
  idGrupo: number
  loading = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GruposService,
    private alertas: AlertasService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if(environment.token == '') {
      this.router.navigate(['/home'])
    }
    this.idGrupo = this.route.snapshot.params['id']
    this.findByIdGrupo(this.idGrupo)
  }

  findByIdGrupo(id: number) {
    return this.grupoService.getById(id).subscribe((resp: Grupos)=>{
      this.grupo = resp
    })
  }
  updateGrupo() {
    this.loading = true
    this.grupoAtualizado.idGrupo = this.grupo.idGrupo
    this.grupoAtualizado.nomeGrupo = this.grupo.nomeGrupo
    this.grupoAtualizado.tema = this.grupo.tema
    this.grupoAtualizado.foto = this.grupo.foto
    if (this.grupoAtualizado.nomeGrupo.length >= 5 && this.grupoAtualizado.tema.length >= 5
      && this.grupoAtualizado.nomeGrupo.length <= 45 && this.grupoAtualizado.tema.length <= 45) {
      this.grupoService.putGrupos(this.grupoAtualizado, this.idGrupo).subscribe((resp: Grupos)=>{
      this.loading = false
      this.grupo = resp
      this.alertas.showAlertSuccess("Grupo Atualizado")
      this.findByIdGrupo(this.idGrupo)
      this.router.navigate(['/pagina-grupo',this.idGrupo])
    })
  } else {
    this.alertas.showAlertDanger("É necessário que o título tenha mais do que 5 caracteres e a postagem deve ter entre 5 e 255 caracteres.")
  }
}

}
