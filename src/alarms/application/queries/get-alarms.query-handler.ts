import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Logger } from "@nestjs/common";
import { FindAlarmsRepository } from "../ports/find-alarms.repository";
import { AlarmReadModel } from "../../domain/read-models/alarm.read-model";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]> {

  private readonly logger: Logger = new Logger(GetAlarmsQueryHandler.name);

  constructor(
    private readonly alarmRepository: FindAlarmsRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    this.logger.debug(`Processing "GetAlarmsQuery": ${JSON.stringify(query)}`);
    return this.alarmRepository.findAll();
  }

}