export class Gastos {

}

export class Gasto {
    public id: number;
    public descripcion: string;
    public monto: number;
    public tipo: number;
    public vence: number;
    public vencimiento: Date;

    constructor(id?: number, descripcion?: string, monto?: number, tipo?: number, vence?: number, vencimiento?: Date) {
    (this.id = id ?? 0),
    (this.descripcion = descripcion ?? ""),
    (this.monto = monto ?? 0),
    (this.tipo = tipo ?? 0),
    (this.vence = vence ?? 0),
    (this.vencimiento = vencimiento ?? new Date());
    }

}