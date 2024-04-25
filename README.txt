Create new alarm:
  
  curl -X POST http://localhost:3000/alarms -H "Content-Type: application/json" -d '{ "name": "Test Alarm", "severity": "high" }'

Get all alarms: 

  curl http://localhost:3000/alarms
