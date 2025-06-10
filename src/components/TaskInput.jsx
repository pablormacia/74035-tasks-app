import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

const TaskInput = ({userInputDown,handleAddTaskUp,setUserInputUp}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.userInput}
                onChangeText={(text) => setUserInputUp(text)}
                value={userInputDown}
            />
            <Button
                title="+"
                onPress={handleAddTaskUp}
            />
        </View>
    )
}

export default TaskInput

const styles = StyleSheet.create({
    userInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: '70%'
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8
  },
})