import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const MedicineList= () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskText, completed: false, time: '' }]);
      setTaskText('');
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTime = (taskId, timeValue) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, time: timeValue } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Medicine List</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add Medicines"
        value={taskText}
        onChangeText={setTaskText}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Medicines</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <CheckBox
              checked={item.completed}
              onPress={() => toggleTask(item.id)}
              containerStyle={styles.checkbox}
            />
            <Text
              style={[
                styles.taskText,
                item.completed && styles.completedTask,
              ]}
            >
              {item.text}
            </Text>
            <TextInput
              style={styles.timeInput}
              placeholder="Time"
              value={item.time}
              onChangeText={(value) => updateTime(item.id, value)}
            />
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Icon name="trash" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkbox: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  taskText: {
    flex: 1,
    marginRight: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  timeInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});

export default MedicineList;
