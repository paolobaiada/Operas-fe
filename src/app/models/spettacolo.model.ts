export interface SpettacoloModelRequest {
  idSpettacolo:number;  
  
  societa:object;
  
  nomeProdotto: string;

    tipologia: string;

    costo: number;

    codiceProdotto: string;

    orario: string;

    descrizione: string;

    immagine: number[];

    dataInserimento:Date;
  }
  
  export interface SpettacoloModelResponse {
    idSpettacolo:number;
    
    societa:object;
    
    nomeProdotto: string;

    tipologia: string;

    costo: number;

    codiceProdotto: string;

    orario: string;

    descrizione: string;

    immagine: number[];

    dataInserimento:Date;
  }