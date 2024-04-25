import { AlarmSeverity } from "src/alarms/domain/value-objects/alarm-severity";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarms";

export class AlarmMapper {
    static toDomain(alarmEntity: AlarmEntity): Alarm {
        const alarmSeverity = new AlarmSeverity(
            alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high'
        )
        const alarmModel = new Alarm(
            alarmEntity.id,
            alarmEntity.name,
            alarmSeverity
        )
        return alarmModel;
    }

    static toPersistence(alarm: Alarm): AlarmEntity {
        const entity = new AlarmEntity();
        entity.id = alarm.id;
        entity.name = entity.name;
        entity.severity = alarm.severity.value;
        return entity;
    }
}