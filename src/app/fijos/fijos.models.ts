export class Fijos {

}

export class Fijo {
    public id: number;
    public id_servicio: number;
    public monto: number;
    public mes: number;
    public vencimiento: Date;

    constructor(id?: number, id_servicio?: number, monto?: number, mes?: number, vencimiento?: Date) {
    (this.id = id ?? 0),
    (this.id_servicio = id_servicio ?? 0),
    (this.monto = monto ?? 0),
    (this.mes = mes ?? 0),
    (this.vencimiento = vencimiento ?? new Date());
    }

}