"use client"

import { FlatList, StyleSheet } from "react-native"
import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onToggle, onDelete, onPress, isDarkMode }) => {
  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onToggle={onToggle}
      onDelete={onDelete}
      onPress={() => onPress(item.id)}
      isDarkMode={isDarkMode}
    />
  )

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
})

export default TaskList
