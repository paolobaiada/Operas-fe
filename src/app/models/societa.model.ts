/** Interfaccia per la richiesta Anagrafica */
export interface SocietaModelRequest {
    idSocieta:number;
    //anagrafica: object;
    nome: string;
    descrizione: string;
    nazione: string;
    provincia: string;
    citta: string;
    indirizzo: string;
  }
  
  /** Interfaccia per la risposta della richiesta di Anagrafica */
  export interface SocietaModelResponse {
    idSocieta:number;
    anagrafica: object;
    nome: string;
    descrizione: string;
    nazione: string;
    provincia: string;
    citta: string;
    indirizzo: string;
  }
  
  /** Interfaccia per il nominativo utente */
  export interface SessioneSocietaModel {
    anagrafica: object
  }