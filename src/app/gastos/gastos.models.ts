export class Gastos {

}

export class Gasto {
    public id: number;
    public descripcion: string;
    public monto: number;

    constructor(id?: number, descripcion?: string, monto?: number) {
    (this.id = id ?? 0),
    (this.descripcion = descripcion ?? ""),
    (this.monto = monto ?? 0);
    }

}