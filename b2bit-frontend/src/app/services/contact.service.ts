import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Interfaz para los datos de contacto
 */
export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  numeroEmpleados?: string;
  motivoContacto?: string;
}

/**
 * Servicio de Contacto
 * Gestiona el envío del formulario de contacto a la Azure Function
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = environment.functionsBaseUrl;
  private functionKey = environment.functionsKey;

  constructor(private http: HttpClient) { }

  /**
   * Envía un mensaje de contacto al servidor
   * @param message Datos del mensaje de contacto
   * @returns Observable con la respuesta del servidor
   */
  sendContactMessage(message: ContactMessage): Observable<any> {
    const url = `${this.baseUrl}/contact/send-message`;
    const headers = this.functionKey ? new HttpHeaders({ 'x-functions-key': this.functionKey }) : undefined;
    return this.http.post(url, message, headers ? { headers } : {});
  }
}
