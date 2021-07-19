import { Grupos } from "./Grupos"
import { Postagens } from "./Postagens"

export class Usuarios{
    public idUsuario : number
    public nomeCompleto : string
    public email: string
    public senha: string
    public foto: string
    public tipo: string
    public status: string
    public sobre: string
    public pronome: string
    public localizacao: string
    public postagens: Postagens[]
    public listaGrupos : Grupos[]

}
