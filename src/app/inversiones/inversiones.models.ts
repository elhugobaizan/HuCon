export class Inversiones {

}

export class Bancos {

}

export enum tipoInversion {
    pfijo = 1,
    wallet = 2
}
export class Inversion {
    public ID: number;
    public nombre: string;
    public id_banco: number;
    public monto: number;
    public tasa: number;
    public vencimiento: Date;
    public tipo: tipoInversion;
    constructor(ID?: number, id_banco?: number, nombre?: string, monto?: number, tasa?: number, vencimiento?: Date, tipo?: tipoInversion) {
    (this.ID = ID ?? 0),
    (this.nombre = nombre ?? ""),
    (this.id_banco = id_banco ?? 0),
    (this.monto = monto ?? 0),
    (this.tasa = tasa ?? 0),
    (this.vencimiento = vencimiento ?? new Date()),
    (this.tipo = tipo ?? tipoInversion.wallet);
    }

}

export class Banco {
    public ID: number;
    public nombre: string;

    constructor(ID?: number, nombre?: string) {
    (this.ID = ID ?? 0),
    (this.nombre = nombre ?? "");
    }

}