import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./create-alarm.command";
import { Logger } from "@nestjs/common";
import { CreateAlarmRepository } from "../ports/create-alarm.repository";
import { AlarmFactory } from "../../domain/factories/alarm.factory";
import { AlarmCreatedEvent } from "../../domain/events/alarm-created.event";

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand> {

  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus
  ) {
  }

  execute(command: CreateAlarmCommand) {
    this.logger.debug(`Processing "CreateAlarmCommand": ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );
    const newAlarm =  this.alarmRepository.save(alarm);

    // This is not the best way to dispatch events.
    // Domain events should be dispatched from the aggregate root, inside the domain layer.
    this.eventBus.publish(new AlarmCreatedEvent(alarm))

    return newAlarm;

  }

}