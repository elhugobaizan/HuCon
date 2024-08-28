export class Bancos {

}

export class Banco {
    public id: number;
    public nombre: string;
    public capital: number;

    constructor(id?: number, nombre?: string, capital?: number) {
    (this.id = id ?? 0),
    (this.nombre = nombre ?? ""),
    (this.capital = capital ?? 0);
    }

}