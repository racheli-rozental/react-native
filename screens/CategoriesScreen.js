"use client"

import { useState, useEffect } from "react"
import { StyleSheet, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CategoryHeader from "../components/CategoryHeader"
import CategoryList from "../components/CategoryList"
import AddCategoryModal from "../components/AddCategoryModal"
import EditCategoryModal from "../components/EditCategoryModal"
import EmptyCategoryList from "../components/EmptyCategoryList"

const CategoriesScreen = ({ navigation, isDarkMode }) => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("")
  const [editingCategory, setEditingCategory] = useState(null)
  const [editedName, setEditedName] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks")
      if (storedTasks !== null) {
        const tasks = JSON.parse(storedTasks)
        const uniqueCategories = [...new Set(tasks.map((task) => (task.category ? task.category : "Uncategorized")))]
        setCategories(uniqueCategories)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load categories")
      console.error(error)
    }
  }

  const addCategory = async () => {
    if (!newCategory.trim()) {
      Alert.alert("Error", "Category name cannot be empty")
      return
    }

    if (categories.includes(newCategory.trim())) {
      Alert.alert("Error", "This category already exists")
      return
    }

    const updatedCategories = [...categories, newCategory.trim()]
    setCategories(updatedCategories)
    setNewCategory("")
    setModalVisible(false)
  }

  const startEditCategory = (category) => {
    setEditingCategory(category)
    setEditedName(category)
    setEditModalVisible(true)
  }

  const saveEditedCategory = async () => {
    if (!editedName.trim()) {
      Alert.alert("Error", "Category name cannot be empty")
      return
    }

    if (categories.includes(editedName.trim()) && editedName.trim() !== editingCategory) {
      Alert.alert("Error", "This category already exists")
      return
    }

    try {
      const storedTasks = await AsyncStorage.getItem("tasks")
      if (storedTasks !== null) {
        const tasks = JSON.parse(storedTasks)
        const updatedTasks = tasks.map((task) => ({
          ...task,
          category: task.category === editingCategory ? editedName.trim() : task.category,
        }))

        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))

        // Update local state
        const updatedCategories = categories.map((cat) => (cat === editingCategory ? editedName.trim() : cat))
        setCategories(updatedCategories)

        setEditModalVisible(false)
        setEditingCategory(null)
        setEditedName("")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update category")
      console.error(error)
    }
  }

  const deleteCategory = (category) => {
    if (category === "Uncategorized") {
      Alert.alert("Error", "Cannot delete the default category")
      return
    }

    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category? All tasks in this category will be moved to 'Uncategorized'.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const storedTasks = await AsyncStorage.getItem("tasks")
              if (storedTasks !== null) {
                const tasks = JSON.parse(storedTasks)
                const updatedTasks = tasks.map((task) => ({
                  ...task,
                  category: task.category === category ? "Uncategorized" : task.category,
                }))

                await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))

                // Update local state
                const updatedCategories = categories.filter((cat) => cat !== category)
                if (!updatedCategories.includes("Uncategorized")) {
                  updatedCategories.push("Uncategorized")
                }
                setCategories(updatedCategories)
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete category")
              console.error(error)
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      <CategoryHeader title="Categories" onAddPress={() => setModalVisible(true)} isDarkMode={isDarkMode} />

      {categories.length === 0 ? (
        <EmptyCategoryList isDarkMode={isDarkMode} />
      ) : (
        <CategoryList
          categories={categories}
          onEdit={startEditCategory}
          onDelete={deleteCategory}
          isDarkMode={isDarkMode}
        />
      )}

      <AddCategoryModal
        visible={modalVisible}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        onAdd={addCategory}
        onClose={() => {
          setModalVisible(false)
          setNewCategory("")
        }}
        isDarkMode={isDarkMode}
      />

      <EditCategoryModal
        visible={editModalVisible}
        editedName={editedName}
        setEditedName={setEditedName}
        onSave={saveEditedCategory}
        onClose={() => {
          setEditModalVisible(false)
          setEditingCategory(null)
          setEditedName("")
        }}
        isDarkMode={isDarkMode}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CategoriesScreen
