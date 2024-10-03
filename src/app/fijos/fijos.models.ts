export class Fijos {

}

export class Servicios {

}

export class Fijo {
    public ID: number;
    public id_servicio: number;
    public nombre: string;
    public monto: number;
    public mes: number;
    public vencimiento: Date;
    public pagado: number;
    public cuenta: string;
    public link: string;

    constructor(ID?: number, id_servicio?: number, nombre?: string, monto?: number, mes?: number, vencimiento?: Date, pagado?: number, cuenta?: string, link?: string) {
    (this.ID = ID ?? 0),
    (this.id_servicio = id_servicio ?? 0),
    (this.nombre = nombre ?? ""),
    (this.monto = monto ?? 0),
    (this.mes = mes ?? 0),
    (this.vencimiento = vencimiento ?? new Date()),
    (this.pagado = pagado ?? 0),
    (this.cuenta = cuenta ?? ""),
    (this.link = link ?? "");
    }

}

export class Servicio {
    public ID: number;
    public nombre: string;

    constructor(ID?: number, nombre?: string) {
    (this.ID = ID ?? 0),
    (this.nombre = nombre ?? "");
    }

}