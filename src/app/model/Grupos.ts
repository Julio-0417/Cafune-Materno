import { Postagens } from "./Postagens"
import { Usuarios } from "./Usuarios"

export class Grupos{
    public idGrupo: number
    public nomeGrupo: string
    public post: Postagens[]
    public tema : string
    public listaParticipantes: Usuarios[]
    public foto: string
}
