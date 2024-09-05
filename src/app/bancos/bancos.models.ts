export class Bancos {

}

export class Banco {
    public id: number;
    public nombre: string;
    public capital: number;
    public efectivo: number;

    constructor(id?: number, nombre?: string, capital?: number, efectivo?: number) {
    (this.id = id ?? 0),
    (this.nombre = nombre ?? ""),
    (this.capital = capital ?? 0),
    (this.efectivo = efectivo ?? 0);
    }

}