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
  idGrupo: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GruposService,
    private alertas: AlertasService,
  ) { }

  ngOnInit() {
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
    this.grupoService.putGrupos(this.grupo, this.idGrupo).subscribe((resp: Grupos)=>{
      this.grupo = resp
      this.alertas.showAlertSuccess("Grupo Atualizado")
      this.findByIdGrupo(this.idGrupo)
      this.router.navigate(['/pagina-grupo',this.idGrupo])
    })
}

}
