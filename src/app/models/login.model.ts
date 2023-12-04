/** Interfaccia per la richiesta di login */
export interface LoginModelRequest {
  /** Email dell'utente */
  email: string;
  /** Password dell'utente */
  password: string;
  /** Se l'utente deve rimanere loggato oppure no */
  rememberMe: boolean;
}

/** Interfaccia per la risposta della richiesta di login */
export interface LoginModelResponse {
  id: number;
  email: string;
  password: string
  usertype: string;
}

/** Interfaccia per il nominativo utente */
export interface SessioneUtenteModel {
  id: number;
  email: string;
  password: string;
  usertype: string;
}

