/** Interfaccia per la richiesta Anagrafica */
export interface AnagraficaModelRequest {
    idAnagrafica:number;
    user: object;
    nome: string;
    cognome: string;
    dataNascita: string;
    genere: string;
    nazione: string;
    provincia: string;
    citta: string;
    indirizzo: string;
    dataRegistrazione: Date;
  }
  
  /** Interfaccia per la risposta della richiesta di Anagrafica */
  export interface AnagraficaModelResponse {
    idAnagrafica:number;
    user: object;
    nome: string;
    cognome: string;
    dataNascita: string;
    genere: string;
    nazione: string;
    provincia: string;
    citta: string;
    indirizzo: string;
    dataRegistrazione: Date;
  }
  
  /** Interfaccia per il nominativo utente */
  export interface SessioneAnagraficaModel {
    user: object
  }
  
  