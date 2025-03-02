import { Ticket } from '../../components/ticket/ticket.model';

export class TicketsUtility {
  generateNewTicket(
    { title, text }: { title: string; text: string },
    tickets: Ticket[]
  ): Ticket[] {
    const _tickets: Ticket[] = [...tickets];
    _tickets.unshift({
      id: this.generateTicketUUID(),
      title,
      request: text,
      status: 'open',
    });

    return _tickets;
  }

  generateUpdatedTicket(
    taskId: string,
    newStatus: Ticket['status'],
    tickets: Ticket[]
  ) {
    const _tickets = [...tickets];
    const index = _tickets.findIndex((ticket) => ticket.id === taskId);
    _tickets[index].status = newStatus;

    return _tickets;
  }

  removeTicket(taskId: string, tickets: Ticket[]) {
    return [...tickets].filter((ticket) => ticket.id !== taskId);
  }

  generateTicketUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
