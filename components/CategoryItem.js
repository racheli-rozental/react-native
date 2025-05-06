import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CategoryItem = ({ category, onEdit, onDelete, isDarkMode }) => {
  return (
    <View style={[styles.categoryItem, { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }]}>
      <View style={styles.categoryInfo}>
        <Ionicons name="folder-outline" size={24} color={isDarkMode ? "#fff" : "#000"} style={styles.categoryIcon} />
        <Text style={[styles.categoryName, { color: isDarkMode ? "#fff" : "#000" }]}>{category}</Text>
      </View>

      <View style={styles.categoryActions}>
        {category !== "Uncategorized" && (
          <>
            <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(category)}>
              <Ionicons name="pencil-outline" size={22} color={isDarkMode ? "#fff" : "#000"} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(category)}>
              <Ionicons name="trash-outline" size={22} color="#f44336" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
  },
  categoryActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
})

export default CategoryItem
