import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CategoryHeader = ({ title, onAddPress, isDarkMode }) => {
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>{title}</Text>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }]}
        onPress={onAddPress}
      >
        <Ionicons name="add" size={24} color={isDarkMode ? "#fff" : "#000"} />
        <Text style={{ color: isDarkMode ? "#fff" : "#000", marginLeft: 8 }}>Add Category</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
})

export default CategoryHeader
