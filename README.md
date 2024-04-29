# NestJS Architecture & Advanced Patterns

## Create New Alarm

```bash
curl -X POST http://localhost:3000/alarms \
-H "Content-Type: application/json" \
-d '{ "name": "Test Alarm", "severity": "high" }' | json_pp
```

## Get All Alarms

```bash
curl http://localhost:3000/alarms | json_pp
```

## Create New Alarm (New Model from "Experimenting with CQRS" Part 1, 2 and 3)

```bash
curl --location --request POST 'localhost:3000/alarms' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Alarm 1",
    "severity": "HIGH",
    "triggeredAt": "2021-01-01T00:00:00.000Z",
    "items": [
        {
            "name": "Item 1",
            "type": "TYPE_1"
        },
        {
            "name": "Item 2",
            "type": "TYPE_2"
        }
    ]
}' | json_pp
```

