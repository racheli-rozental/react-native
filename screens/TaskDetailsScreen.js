"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import TaskDetailsHeader from "../components/TaskDetailsHeader"
import TaskDetailsInfo from "../components/TaskDetailsInfo"
import TaskDetailsActions from "../components/TaskDetailsActions"
import TaskEditForm from "../components/TaskEditForm"

const TaskDetailsScreen = ({ route, navigation, isDarkMode }) => {
  const { taskId } = route.params
  const [task, setTask] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const loadTask = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks")
        if (storedTasks !== null) {
          const tasks = JSON.parse(storedTasks)
          const foundTask = tasks.find((t) => t.id === taskId)
          if (foundTask) {
            setTask(foundTask)
            setTitle(foundTask.title)
            setDescription(foundTask.description || "")
            setCategory(foundTask.category || "")
            setIsCompleted(foundTask.completed || false)

            // Extract unique categories
            const uniqueCategories = [...new Set(tasks.map((t) => (t.category ? t.category : "Uncategorized")))]
            setCategories(uniqueCategories)
          }
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load task details")
        console.error(error)
      }
    }

    loadTask()
  }, [taskId])

  const saveChanges = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty")
      return
    }

    try {
      const storedTasks = await AsyncStorage.getItem("tasks")
      if (storedTasks !== null) {
        const tasks = JSON.parse(storedTasks)
        const updatedTasks = tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                title,
                description,
                category,
                completed: isCompleted,
                updatedAt: new Date().toISOString(),
              }
            : t,
        )
        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))
        setTask({ ...task, title, description, category, completed: isCompleted })
        setIsEditing(false)
        Alert.alert("Success", "Task updated successfully")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update task")
      console.error(error)
    }
  }

  const toggleCompletion = async () => {
    const newCompletionStatus = !isCompleted
    setIsCompleted(newCompletionStatus)

    if (!isEditing) {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks")
        if (storedTasks !== null) {
          const tasks = JSON.parse(storedTasks)
          const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, completed: newCompletionStatus } : t))
          await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))
          setTask({ ...task, completed: newCompletionStatus })
        }
      } catch (error) {
        Alert.alert("Error", "Failed to update task status")
        console.error(error)
      }
    }
  }

  const deleteTask = async () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task? This action cannot be undone.",
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
                const updatedTasks = tasks.filter((t) => t.id !== taskId)
                await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))
                navigation.goBack()
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete task")
              console.error(error)
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  const cancelEditing = () => {
    setTitle(task.title)
    setDescription(task.description || "")
    setCategory(task.category || "")
    setIsCompleted(task.completed || false)
    setIsEditing(false)
  }

  if (!task) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isEditing ? (
            <TaskEditForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              category={category}
              setCategory={setCategory}
              isCompleted={isCompleted}
              toggleCompletion={toggleCompletion}
              categories={categories}
              onSave={saveChanges}
              onCancel={cancelEditing}
              isDarkMode={isDarkMode}
            />
          ) : (
            <View style={styles.detailsContainer}>
              <TaskDetailsHeader title={task.title} isDarkMode={isDarkMode} />

              <TaskDetailsActions
                onEdit={() => setIsEditing(true)}
                onToggleComplete={toggleCompletion}
                onDelete={deleteTask}
                isCompleted={isCompleted}
                isDarkMode={isDarkMode}
              />

              <TaskDetailsInfo task={task} isCompleted={isCompleted} isDarkMode={isDarkMode} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  detailsContainer: {
    flex: 1,
  },
})

export default TaskDetailsScreen
