import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyCategoryList = ({ isDarkMode }) => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="folder-open-outline" size={64} color={isDarkMode ? "#555" : "#ccc"} />
      <Text style={[styles.emptyText, { color: isDarkMode ? "#aaa" : "#666" }]}>
        No categories yet. Add a new category to get started!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
})

export default EmptyCategoryList
