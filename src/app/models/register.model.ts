/** Interfaccia per la richiesta di registrazione */
export interface RegisterModelRequest {
    /** Email dell'utente */
    email: string;
    /** Password dell'utente */
    password: string;
    /** Tipo dell'utente */
    usertype: string;
  }
  
  /** Interfaccia per la risposta della richiesta di registrazione */
  export interface RegisterModelResponse {
    /** Il tipo di utente */
    usertype: string;
  }
  
  /** Interfaccia per il nominativo utente */
  export interface SessioneTipoUtenteModel {
    /** Il tipo di utente */
    usertype: string;
  }