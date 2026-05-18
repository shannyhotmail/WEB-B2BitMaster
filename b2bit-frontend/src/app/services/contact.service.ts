import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

/**
 * Servicio de Contacto
 * Gestiona la comunicación con el backend para enviar mensajes de contacto
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) { }

  /**
   * Envía un mensaje de contacto al servidor
   * @param message Datos del mensaje de contacto
   * @returns Observable con la respuesta del servidor
   */
  sendContactMessage(message: ContactMessage): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-message`, message);
  }

  /**
   * Obtiene la lista de contactos (solo para administradores)
   * @returns Observable con la lista de mensajes
   */
  getMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/messages`);
  }
}
