import { Injectable } from "@nestjs/common";
import { UpsertMaterializedAlarmRepository } from "../../../../application/ports/upsert-materialized-alarm.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { InjectModel } from "@nestjs/mongoose";
import { MaterializedAlarmView } from "../schemas/materialized-alarms-view.schema";
import { Model } from "mongoose";

@Injectable()
export class OrmUpsertMaterializedAlarmRepository
  implements UpsertMaterializedAlarmRepository {

  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>
  ) {}

  async upsert(
    alarm: Pick<AlarmReadModel, "id"> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate(
      { id: alarm.id },
      alarm,
      { upsert: true },
    )
  }

}