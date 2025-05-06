"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CategoryPicker from "./CategoryPicker"

const AddTaskModal = ({ visible, onClose, onAddTask, isDarkMode, categories = [] }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title")
      return
    }

    const finalCategory = showNewCategoryInput && newCategory.trim() ? newCategory.trim() : category

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      category: finalCategory,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setCategory("")
    setNewCategory("")
    setShowNewCategoryInput(false)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View style={[styles.modalContent, { backgroundColor: isDarkMode ? "#333" : "#fff" }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Add New Task</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={isDarkMode ? "#fff" : "#000"} />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={styles.formGroup}>
                  <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>Title *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
                        color: isDarkMode ? "#fff" : "#000",
                      },
                    ]}
                    placeholder="Enter task title"
                    placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>Category</Text>

                  {!showNewCategoryInput ? (
                    <>
                      <CategoryPicker
                        selectedCategory={category}
                        onSelectCategory={setCategory}
                        categories={categories}
                        isDarkMode={isDarkMode}
                      />

                      <TouchableOpacity style={styles.newCategoryButton} onPress={() => setShowNewCategoryInput(true)}>
                        <Ionicons name="add-circle-outline" size={18} color={isDarkMode ? "#fff" : "#000"} />
                        <Text style={{ color: isDarkMode ? "#fff" : "#000", marginLeft: 5 }}>Add New Category</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <View>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
                            color: isDarkMode ? "#fff" : "#000",
                          },
                        ]}
                        placeholder="Enter new category name"
                        placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
                        value={newCategory}
                        onChangeText={setNewCategory}
                      />

                      <TouchableOpacity
                        style={styles.cancelCategoryButton}
                        onPress={() => {
                          setShowNewCategoryInput(false)
                          setNewCategory("")
                        }}
                      >
                        <Text style={{ color: isDarkMode ? "#ff6b6b" : "#f44336" }}>Cancel New Category</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>Description (optional)</Text>
                  <TextInput
                    style={[
                      styles.textArea,
                      {
                        backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
                        color: isDarkMode ? "#fff" : "#000",
                      },
                    ]}
                    placeholder="Enter task description"
                    placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </ScrollView>

              <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                <Text style={styles.addButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  keyboardAvoidingView: {
    width: "100%",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  newCategoryButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
  },
  cancelCategoryButton: {
    alignItems: "center",
    marginTop: 8,
    padding: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default AddTaskModal
