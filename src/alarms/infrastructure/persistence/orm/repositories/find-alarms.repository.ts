import { Injectable } from "@nestjs/common";
import { FindAlarmsRepository } from "../../../../application/ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { InjectModel } from "@nestjs/mongoose";
import { MaterializedAlarmView } from "../schemas/materialized-alarms-view.schema";
import { Model } from "mongoose";

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {

  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>
  ) {
  }

  async findAll(): Promise<AlarmReadModel[]> {
    return this.alarmModel.find();
  }
}