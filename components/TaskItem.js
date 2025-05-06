import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const TaskItem = ({ task, onToggle, onDelete, onPress, isDarkMode }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: isDarkMode ? "#333" : "#fff",
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <TouchableOpacity style={styles.checkbox} onPress={() => onToggle(task.id)}>
        <Ionicons
          name={task.completed ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={task.completed ? "#4CAF50" : isDarkMode ? "#aaa" : "#666"}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: isDarkMode ? "#fff" : "#000",
              textDecorationLine: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.7 : 1,
            },
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        {task.category ? (
          <Text style={[styles.category, { color: isDarkMode ? "#aaa" : "#666" }]}>{task.category}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
        <Ionicons name="trash-outline" size={22} color={isDarkMode ? "#ff6b6b" : "#f44336"} />
      </TouchableOpacity>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 4,
  },
})

export default TaskItem
