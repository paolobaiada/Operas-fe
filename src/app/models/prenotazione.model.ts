/** Interfaccia per la richiesta di prenotazione */
export interface PrenotaModelRequest {
    idPrenotazione: number,
    anagrafica: any,
    spettacolo: any,
    data: any,
    numeroOrdine: string,
    costo: number
}
  
  /** Interfaccia per la risposta della richiesta di prenotazione */
export interface PrenotaModelResponse {
    idPrenotazione: number,
    anagrafica: any,
    spettacolo: any,
    data: any,
    numeroOrdine: string,
    costo: number
}