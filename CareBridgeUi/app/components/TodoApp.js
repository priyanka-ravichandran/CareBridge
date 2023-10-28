import React, { useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from "axios"; 

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  useEffect(() => {
    axios.get("http://csci5308vm20.research.cs.dal.ca:8080/checklist") .then((response) => { 
              response.map((task)=>{
                setTasks([...tasks, { id: Date.now(), text: task.itemName, completed: false }]);
              })                
              
            }); 
      
  }, []);  

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Shopping List</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add Item"
        value={taskText}
        onChangeText={setTaskText}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Item</Text>
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
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
});

export default TodoApp;
