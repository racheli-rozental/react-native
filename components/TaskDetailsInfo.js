import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const TaskDetailsInfo = ({ task, isCompleted, isDarkMode }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <>
      {task.category ? (
        <View style={[styles.infoCard, { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }]}>
          <View style={styles.infoRow}>
            <Ionicons name="folder-outline" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <Text style={[styles.infoLabel, { color: isDarkMode ? "#aaa" : "#666" }]}>Category:</Text>
            <Text style={[styles.infoValue, { color: isDarkMode ? "#fff" : "#000" }]}>{task.category}</Text>
          </View>
        </View>
      ) : null}

      <View style={[styles.infoCard, { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }]}>
        <View style={styles.infoRow}>
          <Ionicons
            name={isCompleted ? "checkmark-circle" : "time-outline"}
            size={22}
            color={isCompleted ? "#4CAF50" : isDarkMode ? "#ff9800" : "#ff6d00"}
          />
          <Text style={[styles.infoLabel, { color: isDarkMode ? "#aaa" : "#666" }]}>Status:</Text>
          <Text
            style={[
              styles.infoValue,
              {
                color: isCompleted ? "#4CAF50" : isDarkMode ? "#ff9800" : "#ff6d00",
              },
            ]}
          >
            {isCompleted ? "Completed" : "Pending"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={22} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.infoLabel, { color: isDarkMode ? "#aaa" : "#666" }]}>Created:</Text>
          <Text style={[styles.infoValue, { color: isDarkMode ? "#fff" : "#000" }]}>{formatDate(task.createdAt)}</Text>
        </View>

        {task.updatedAt ? (
          <View style={styles.infoRow}>
            <Ionicons name="refresh-outline" size={22} color={isDarkMode ? "#fff" : "#000"} />
            <Text style={[styles.infoLabel, { color: isDarkMode ? "#aaa" : "#666" }]}>Last Updated:</Text>
            <Text style={[styles.infoValue, { color: isDarkMode ? "#fff" : "#000" }]}>
              {formatDate(task.updatedAt)}
            </Text>
          </View>
        ) : null}
      </View>

      <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Description</Text>
      <View style={[styles.descriptionContainer, { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }]}>
        <Text style={[styles.description, { color: isDarkMode ? "#fff" : "#000" }]}>
          {task.description || "No description provided."}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    marginLeft: 8,
    marginRight: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 10,
  },
  descriptionContainer: {
    padding: 15,
    borderRadius: 8,
    minHeight: 100,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
})

export default TaskDetailsInfo
