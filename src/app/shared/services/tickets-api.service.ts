import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../../components/ticket/ticket.model';
import { LoggingService } from './logging.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { constants } from '../constants';
import { JsonBinResponseType } from '../shared-types';
import { TicketsUtility } from '../utilities/tickets.utility';

const API_URL = constants.BASE_URL + '/b/' + constants.BINS.tickets;
const headers = {
  'Content-Type': 'application/json',
  ...constants.HEADERS,
};

@Injectable({
  providedIn: 'root',
})
export class TicketsAPIService extends TicketsUtility {
  private readonly isLoading = signal(false);
  private readonly httpClient = inject(HttpClient);
  private readonly loggingService = inject(LoggingService);

  addTicket(
    data: {
      title: string;
      text: string;
    },
    tickets: Ticket[]
  ): Observable<Ticket[] | null> {
    const ticketsData = this.generateNewTicket(data, tickets);

    this.isLoading.update((state) => !state);

    return this.httpClient
      .put<JsonBinResponseType<'tickets', Ticket[]>>(
        API_URL,
        { tickets: ticketsData },
        {
          headers,
        }
      )
      .pipe(
        map((res) => {
          this.isLoading.update((state) => !state);
          return res.record.tickets;
        }),
        catchError((err) => {
          this.isLoading.update((state) => !state);
          return throwError(
            () => new Error(`Failed to add new ticket. [ERROR]: ${err.message}`)
          );
        })
      );
  }

  fetchTickets(): Observable<Ticket[]> {
    this.isLoading.update((state) => !state);

    return this.httpClient
      .get<JsonBinResponseType<'tickets', Ticket[]>>(API_URL, {
        headers,
      })
      .pipe(
        map((result) => {
          this.isLoading.update((state) => !state);
          return result.record.tickets;
        }),
        catchError((error) => {
          this.isLoading.update((state) => !state);

          return throwError(
            () =>
              new Error(`Failed to fetch tickets. [ERROR]: ${error.message}`)
          );
        })
      );
  }

  updateTaskStatus(
    taskId: string,
    newStatus: Ticket['status'],
    tickets: Ticket[]
  ) {
    const ticketsData = this.generateUpdatedTicket(taskId, newStatus, tickets);
    this.isLoading.update((state) => !state);

    return this.httpClient
      .put<JsonBinResponseType<'tickets', Ticket[]>>(
        API_URL,
        { tickets: ticketsData },
        {
          headers,
        }
      )
      .pipe(
        map((res) => {
          this.isLoading.update((state) => !state);
          return res.record.tickets;
        }),
        catchError((err) => {
          this.isLoading.update((state) => !state);
          return throwError(
            () =>
              new Error(
                `Failed to update task ${taskId}. [ERROR]: ${err.message}`
              )
          );
        })
      );
  }

  deleteTicket(taskId: string, tickets: Ticket[]) {
    const ticketsData = this.removeTicket(taskId, tickets);

    this.isLoading.update((state) => !state);

    return this.httpClient
      .put<JsonBinResponseType<'tickets', Ticket[]>>(
        API_URL,
        { tickets: ticketsData },
        { headers }
      )
      .pipe(
        map((res) => {
          this.isLoading.update((state) => !state);
          return res.record.tickets;
        }),
        catchError((err) => {
          this.isLoading.update((state) => !state);
          return throwError(
            () =>
              new Error(
                `Failed to delete task ${taskId}. [ERROR]: ${err.message}`
              )
          );
        })
      );
  }

  ticketsLoadingState() {
    return this.isLoading.asReadonly();
  }
}
