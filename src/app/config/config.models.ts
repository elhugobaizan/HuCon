export class Configs {

}

export class Config {
    public ID: number;
    public nombre: string;
    public valor: string;

    constructor(ID?: number, nombre?: string, valor?: string) {
    (this.ID = ID ?? 0),
    (this.nombre = nombre ?? ""),
    (this.valor = valor ?? "");
    }

}