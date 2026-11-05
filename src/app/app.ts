import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {

  // Valor actual del contador
  contador: number = 0;

  // Estado del monitoreo
  monitoreando: boolean = false;

  // Historial de los últimos eventos
  historial: string[] = [];

  // Suscripción al observable
  suscripcion: Subscription | null = null;

  // Inicia el monitoreo
  iniciarMonitoreo(): void {

    // Evita crear varias suscripciones
    if (this.monitoreando) {
      return;
    }

    this.monitoreando = true;

    // Genera un evento cada segundo
    this.suscripcion = interval(1000).subscribe(valor => {

      this.contador++;

      const evento = `Evento #${this.contador} - ${new Date().toLocaleTimeString()}`;

      // Agrega el evento al historial
      this.historial.unshift(evento);

      // Conserva solamente los últimos 10 eventos
      this.historial = this.historial.slice(0, 10);

    });
  }

  // Detiene el monitoreo
  detenerMonitoreo(): void {

    this.suscripcion?.unsubscribe();

    this.suscripcion = null;
    this.monitoreando = false;
  }

  // Reinicia el contador y el historial
  reiniciarMonitoreo(): void {

    this.detenerMonitoreo();

    this.contador = 0;
    this.historial = [];
  }

  // Libera la suscripción al destruir el componente
  ngOnDestroy(): void {
    this.detenerMonitoreo();
  }
}