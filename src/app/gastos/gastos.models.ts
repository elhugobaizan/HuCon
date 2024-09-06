export class Gastos {

}

export class Gasto {
    public ID: number;
    public descripcion: string;
    public monto: number;

    constructor(ID?: number, descripcion?: string, monto?: number) {
    (this.ID = ID ?? 0),
    (this.descripcion = descripcion ?? ""),
    (this.monto = monto ?? 0);
    }

}