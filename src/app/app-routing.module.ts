import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjudaSuporteComponent } from './ajuda-suporte/ajuda-suporte.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { DoacaoHigieneComponent } from './doacao-higiene/doacao-higiene.component';
import { DoacaoLeiteComponent } from './doacao-leite/doacao-leite.component';
import { DoacaoRoupaComponent } from './doacao-roupa/doacao-roupa.component';
import { GrupoEditComponent } from './edit/grupo-edit/grupo-edit.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { GruposComponent } from './grupos/grupos.component';
import { PaginaGrupoComponent } from './grupos/pagina-grupo/pagina-grupo.component';
import { HomeComponent } from './home/home.component';
import { MinhasPostagensComponent } from './minhas-postagens/minhas-postagens.component';
import { PaginaUsuarioComponent } from './pagina-usuario/pagina-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'entrar', component: EntrarComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'grupos', component: GruposComponent },
  { path: 'pagina-grupo/:id', component: PaginaGrupoComponent},
  { path: 'grupo-edit/:id', component: GrupoEditComponent},
  { path: 'minhas-postagens/:id', component: MinhasPostagensComponent},
  { path: 'postagem-delete/:id', component: PostagemDeleteComponent},
  { path: 'postagem-edit/:id', component: PostagemEditComponent},
  { path: 'pagina-usuario/:id', component: PaginaUsuarioComponent},
  { path: 'usuario-edit/:id', component: UsuarioEditComponent},
  { path: 'doacao-leite', component: DoacaoLeiteComponent},
  { path: 'doacao-higiene', component: DoacaoHigieneComponent},
  { path: 'doacao-roupa', component: DoacaoRoupaComponent},
  { path: 'ajuda-suporte', component: AjudaSuporteComponent}
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
