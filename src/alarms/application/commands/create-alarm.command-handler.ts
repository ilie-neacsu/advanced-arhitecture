import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./create-alarm.command";
import { Logger } from "@nestjs/common";
import { CreateAlarmRepository } from "../ports/create-alarm.repository";
import { AlarmFactory } from "../../domain/factories/alarm.factory";
import { AlarmCreatedEvent } from "../../domain/events/alarm-created.event";
import { Alarm } from "../../domain/alarm";

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand> {

  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly alarmFactory: AlarmFactory,
  ) {
  }

  async execute(command: CreateAlarmCommand) {
    this.logger.debug(`Processing "CreateAlarmCommand": ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );
    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();
    return alarm;

  }

}