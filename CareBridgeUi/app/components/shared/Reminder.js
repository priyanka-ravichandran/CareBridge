import React, { useState } from 'react';
import { View, Text, Switch, Button, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Reminder() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alarmSound, setAlarmSound] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [snooze, setSnooze] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Reminder</Text>

      {/* Date Picker */}
      <View style={styles.dateContainer}>
        <Text>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}
      </View>

      {/* Time Picker */}
      <View style={styles.timePicker}>
        <Picker
          selectedValue={time.getHours()}
          style={{ width: 50 }}
          onValueChange={(itemValue) =>
            setTime((prev) => new Date(prev.setHours(itemValue)))
          }
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <Picker.Item key={i} label={`${i}`} value={i} />
          ))}
        </Picker>
        <Text>:</Text>
        <Picker
          selectedValue={time.getMinutes()}
          style={{ width: 50 }}
          onValueChange={(itemValue) =>
            setTime((prev) => new Date(prev.setMinutes(itemValue)))
          }
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <Picker.Item key={i} label={`${i}`} value={i} />
          ))}
        </Picker>
      </View>

      {/* Alarm Settings */}
      <View style={styles.alarmSetting}>
        <Text>Alarm sound</Text>
        <Switch
          value={alarmSound}
          onValueChange={(value) => setAlarmSound(value)}
        />
      </View>
      <View style={styles.alarmSetting}>
        <Text>Vibration</Text>
        <Switch
          value={vibration}
          onValueChange={(value) => setVibration(value)}
        />
      </View>
      <View style={styles.alarmSetting}>
        <Text>Snooze</Text>
        <Switch
          value={snooze}
          onValueChange={(value) => setSnooze(value)}
        />
      </View>
      
      <Button title="Set Reminder" onPress={() => alert('Reminder Set!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  calendarIcon: {
    marginLeft: 10,
    fontSize: 20
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  alarmSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  }
});
