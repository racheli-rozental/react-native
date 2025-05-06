"use client"

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"

const CategoryPicker = ({ selectedCategory, onSelectCategory, categories = [], isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const allCategories = ["Uncategorized", ...categories.filter((cat) => cat !== "Uncategorized")]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectCategory = (category) => {
    onSelectCategory(category)
    setIsOpen(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.pickerButton,
          {
            backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
            borderColor: isDarkMode ? "#555" : "#ddd",
          },
        ]}
        onPress={toggleDropdown}
      >
        <View style={styles.selectedItem}>
          <Ionicons name="folder-outline" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.icon} />
          <Text style={[styles.selectedText, { color: isDarkMode ? "#fff" : "#000" }]}>
            {selectedCategory || "Select a category"}
          </Text>
        </View>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color={isDarkMode ? "#fff" : "#000"} />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
              borderColor: isDarkMode ? "#555" : "#ddd",
            },
          ]}
        >
          <ScrollView style={styles.dropdownScroll} nestedScrollEnabled={true}>
            {allCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownItem,
                  selectedCategory === category && {
                    backgroundColor: isDarkMode ? "#555" : "#e0e0e0",
                  },
                ]}
                onPress={() => selectCategory(category)}
              >
                <Ionicons name="folder-outline" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.icon} />
                <Text style={[styles.dropdownText, { color: isDarkMode ? "#fff" : "#000" }]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  pickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 2,
    maxHeight: 200,
  },
  dropdownScroll: {
    width: "100%",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
  },
})

export default CategoryPicker
