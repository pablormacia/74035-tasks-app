import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [userInput, setUserInput] = useState("")
  const [tasksList, setTasksList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [taskSelected, setTaskSelected] = useState({})

  //console.log("Valor de userInput: ",userInput )
  //console.log("Valor de tasksList: ", tasksList)
  //console.log("Valor de taskSelected", taskSelected)

  const handleAddTask = () => {
    if (userInput != "") {
      setTasksList(tasksListPreview=>[...tasksListPreview, { id: Math.random(), value: userInput }])
      setUserInput("")
    }
  }

  const deleteTask = (id) => {
    setTasksList(tasksList.filter(task => task.id !== id)) //"filter inverso"
    setIsModalVisible(!isModalVisible)
  }

  const handleDeleteTask = (item) => {
    setIsModalVisible(!isModalVisible)
    setTaskSelected(item)
  }

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text>{item.value}</Text>
      <Button title="x" onPress={() => handleDeleteTask(item)} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>App de tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.userInput}
          onChangeText={(text) => setUserInput(text)}
          value={userInput}
        />
        <Button
          title="+"
          onPress={handleAddTask}
        />
      </View>
      <View style={styles.tasksContainer}>
        {/*  {
          tasksList.map((task,index)=>(
            <Text key={task.id}>{task.value}</Text>
          ))
        } */}
        <FlatList
          data={tasksList}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
        />
      </View>
      <Modal
        visible={isModalVisible}
        animationType='slide'
      >
        <Text>¿Estás seguro de eliminar {taskSelected.value} ?</Text>
        <View style={styles.buttonContainer}>
          <Button title="Cancelar" color="#ccc" onPress={() => setIsModalVisible(!isModalVisible)} />
          <Button title="Si, eliminar" color="red" onPress={() => deleteTask(taskSelected.id)} />
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  userInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: '70%'
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginVertical: 8
  },
  buttonContainer: {
    flexDirection: 'row',

  }
});
