import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const FilterBar = ({
  activeFilter,
  setActiveFilter,
  activeCategory,
  setActiveCategory,
  categories = [],
  isDarkMode,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Status</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "all" && styles.activeFilterButton,
              { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" },
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Ionicons
              name="list-outline"
              size={18}
              color={activeFilter === "all" ? "#fff" : isDarkMode ? "#fff" : "#000"}
            />
            <Text
              style={[
                styles.filterText,
                activeFilter === "all" && styles.activeFilterText,
                { color: activeFilter === "all" ? "#fff" : isDarkMode ? "#fff" : "#000" },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "pending" && styles.activeFilterButton,
              { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" },
            ]}
            onPress={() => setActiveFilter("pending")}
          >
            <Ionicons
              name="time-outline"
              size={18}
              color={activeFilter === "pending" ? "#fff" : isDarkMode ? "#fff" : "#000"}
            />
            <Text
              style={[
                styles.filterText,
                activeFilter === "pending" && styles.activeFilterText,
                { color: activeFilter === "pending" ? "#fff" : isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "completed" && styles.activeFilterButton,
              { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" },
            ]}
            onPress={() => setActiveFilter("completed")}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={activeFilter === "completed" ? "#fff" : isDarkMode ? "#fff" : "#000"}
            />
            <Text
              style={[
                styles.filterText,
                activeFilter === "completed" && styles.activeFilterText,
                { color: activeFilter === "completed" ? "#fff" : isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategory === "all" && styles.activeCategoryButton,
              { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" },
            ]}
            onPress={() => setActiveCategory("all")}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === "all" && styles.activeCategoryText,
                { color: activeCategory === "all" ? "#fff" : isDarkMode ? "#fff" : "#000" },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton,
                { backgroundColor: isDarkMode ? "#333" : "#f5f5f5" },
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText,
                  { color: activeCategory === category ? "#fff" : isDarkMode ? "#fff" : "#000" },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
  },
  activeFilterText: {
    color: "#fff",
  },
  categoryScroll: {
    flexDirection: "row",
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
  },
  activeCategoryText: {
    color: "#fff",
  },
})

export default FilterBar
