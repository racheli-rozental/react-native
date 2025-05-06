import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const TaskDetailsActions = ({ onEdit, onToggleComplete, onDelete, isCompleted, isDarkMode }) => {
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }]}
        onPress={onEdit}
      >
        <Ionicons name="pencil" size={22} color={isDarkMode ? "#fff" : "#000"} />
        <Text style={{ color: isDarkMode ? "#fff" : "#000", marginLeft: 8 }}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }]}
        onPress={onToggleComplete}
      >
        <Ionicons
          name={isCompleted ? "checkmark-circle" : "ellipse-outline"}
          size={22}
          color={isCompleted ? "#4CAF50" : isDarkMode ? "#fff" : "#000"}
        />
        <Text style={{ color: isDarkMode ? "#fff" : "#000", marginLeft: 8 }}>
          {isCompleted ? "Completed" : "Mark Complete"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#ff6b6b" }]} onPress={onDelete}>
        <Ionicons name="trash-outline" size={22} color="#fff" />
        <Text style={{ color: "#fff", marginLeft: 8 }}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
  },
})

export default TaskDetailsActions
