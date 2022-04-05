export function dataform(afs: any, programacionesARR: any, colecciones: any, toDate: any, fromDate: any) {
    const id = afs.createId();
    let userId = programacionesARR.userId;
    let grupo_id = programacionesARR.grupo_id;
    let grupo_nombre = programacionesARR.grupo_nombre;
    let lugar = programacionesARR.lugar;
    let observ = programacionesARR.observ;
    let foto = programacionesARR.foto;
    let fechaInicio = toDate?.day + '/' + toDate?.month + '/' + toDate?.year;
    let fechaFin = fromDate?.day + '/' + fromDate?.month + '/' + fromDate?.year;

    colecciones = {
        id, userId, grupo_id, grupo_nombre, lugar, observ
        , foto, fechaInicio, fechaFin, Terapias: []
    };
    return colecciones;
}
