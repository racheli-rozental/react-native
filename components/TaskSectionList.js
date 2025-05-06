"use client"

import { SectionList, View, Text, StyleSheet } from "react-native"
import TaskItem from "./TaskItem"

const TaskSectionList = ({ sections, onToggle, onDelete, onPress, isDarkMode }) => {
  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onToggle={onToggle}
      onDelete={onDelete}
      onPress={() => onPress(item.id)}
      isDarkMode={isDarkMode}
    />
  )

  const renderSectionHeader = ({ section }) => (
    <View style={[styles.sectionHeader, { backgroundColor: isDarkMode ? "#222" : "#f0f0f0" }]}>
      <Text style={[styles.sectionHeaderText, { color: isDarkMode ? "#fff" : "#000" }]}>{section.title}</Text>
      <Text style={[styles.sectionCount, { color: isDarkMode ? "#aaa" : "#666" }]}>
        {section.data.length} {section.data.length === 1 ? "task" : "tasks"}
      </Text>
    </View>
  )

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionCount: {
    fontSize: 14,
  },
})

export default TaskSectionList
