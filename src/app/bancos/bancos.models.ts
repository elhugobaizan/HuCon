export class Bancos {

}

export class Banco {
    public ID: number;
    public nombre: string;
    public efectivo: number;
    public alias: string;

    constructor(ID?: number, nombre?: string, alias?: string, efectivo?: number) {
    (this.ID = ID ?? 0),
    (this.nombre = nombre ?? ""),
    (this.alias = alias ?? ""),
    (this.efectivo = efectivo ?? 0);
    }

}