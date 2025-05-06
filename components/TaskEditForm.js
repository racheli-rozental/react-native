"use client"

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from "react-native"
import CategoryPicker from "./CategoryPicker"

const TaskEditForm = ({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  isCompleted,
  toggleCompletion,
  categories,
  onSave,
  onCancel,
  isDarkMode,
}) => {
  return (
    <View style={styles.editContainer}>
      <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>Title</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
            color: isDarkMode ? "#fff" : "#000",
          },
        ]}
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
        placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
      />

      <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>Category</Text>
      <CategoryPicker
        selectedCategory={category}
        onSelectCategory={setCategory}
        categories={categories}
        isDarkMode={isDarkMode}
      />

      <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>Description</Text>
      <TextInput
        style={[
          styles.textArea,
          {
            backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
            color: isDarkMode ? "#fff" : "#000",
          },
        ]}
        value={description}
        onChangeText={setDescription}
        placeholder="Task description (optional)"
        placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <View style={styles.completionContainer}>
        <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>Completed</Text>
        <Switch
          value={isCompleted}
          onValueChange={toggleCompletion}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCompleted ? "#4CAF50" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 120,
  },
  completionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default TaskEditForm
