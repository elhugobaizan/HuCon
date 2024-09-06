export class Bancos {

}

export class Banco {
    public id: number;
    public nombre: string;
    public efectivo: number;
    public alias: string;

    constructor(id?: number, nombre?: string, alias?: string, efectivo?: number) {
    (this.id = id ?? 0),
    (this.nombre = nombre ?? ""),
    (this.alias = alias ?? ""),
    (this.efectivo = efectivo ?? 0);
    }

}