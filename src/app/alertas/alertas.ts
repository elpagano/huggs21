export class Alertas {

    constructor(
      public id: string,
      public usuario_id: string,
      public grupo_id: string,
      public lugar: string,
      public texto: string,
      public estado: string,
      public photoURL: string,
    ) {  }
  
  }