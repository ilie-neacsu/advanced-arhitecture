import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "../../domain/events/alarm-created.event";
import { Logger } from "@nestjs/common";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent> {

  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: AlarmCreatedEvent) {

    this.logger.debug(`Alarm created event: ${JSON.stringify(event)}`);


    /*
    In a real world application, we would have to ensure that this operation is
    atomic with the creation of the alarm, Otherwise, we could end up with an
    alarm that is not reflected in the read model (e.g. because the database
    operation fails.
    For more information, checkout "Transactional inbox/outbox pattern".
    */

    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity.value,
      triggeredAt: event.alarm.triggeredAt,
      isAcknowledged: event.alarm.isAcknowledged,
      items: event.alarm.items,
    });
  }

}