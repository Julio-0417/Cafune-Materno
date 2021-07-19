import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Grupos } from '../model/Grupos';
import { Postagens } from '../model/Postagens';
import { Usuarios } from '../model/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  usuario: Usuarios = new Usuarios()

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  getAllGrupos(): Observable<Grupos[]> {
    return this.http.get<Grupos[]>('https://appcafunematerno.herokuapp.com/grupos', this.token)
  }

  getById(idGrupo: number): Observable<Grupos>{
    return this.http.get<Grupos>(`https://appcafunematerno.herokuapp.com/grupos/id/${idGrupo}`, this.token)
 }

  postGrupos(grupos: Grupos, id: number): Observable<Grupos> {
    return this.http.post<Grupos>(`https://appcafunematerno.herokuapp.com/grupos/salvar/usuario/${id}`, grupos, this.token)
  }

  putGrupos(grupos: Grupos, idGrupo: number): Observable<Grupos> {
    return this.http.put<Grupos>(`https://appcafunematerno.herokuapp.com/grupos/atualizar/${idGrupo}`, grupos, this.token)
  }

  deleteGrupos(idGrupo: number){
    let params = new HttpParams().set('idGrupo', idGrupo)
    return this.http.delete(`https://appcafunematerno.herokuapp.com/grupos/deletar?${params}`, this.token)
  }

  addGrupo(idUsuario: number, idGrupo: number): Observable<Usuarios>{
    return this.http.put<Usuarios>(`https://appcafunematerno.herokuapp.com/grupos/id/add/grupo/${idGrupo}/usuario/${idUsuario}`, this.usuario , this.token)
  }

  removerGrupo(idUsuario: number, idGrupo: number): Observable<Usuarios>{
    return this.http.put<Usuarios>(`https://appcafunematerno.herokuapp.com/grupos/id/remove/grupo/${idGrupo}/usuario/${idUsuario}`, this.usuario , this.token)
  }



  findByIdUsuario(idUsuario: number): Observable<Usuarios>{
    return this.http.get<Usuarios>(`https://appcafunematerno.herokuapp.com/usuarios/id/${idUsuario}`, this.token )
  }

  getAllPostagens(): Observable<Postagens[]> {
    return this.http.get<Postagens[]>('https://appcafunematerno.herokuapp.com/postagens', this.token)
  }

  postPostagem(postagens: Postagens, idPostagem: number): Observable<Postagens> {
    return this.http.post<Postagens>(`https://appcafunematerno.herokuapp.com/postagens/salvar/usuario/${idPostagem}`, postagens, this.token)
  }


}
