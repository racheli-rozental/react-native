"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AddTaskModal from "../components/AddTaskModal"
import TaskList from "../components/TaskList"
import TaskSectionList from "../components/TaskSectionList"
import FilterBar from "../components/FilterBar"
import EmptyTaskList from "../components/EmptyTaskList"
import HomeHeader from "../components/HomeHeader"

const HomeScreen = ({ navigation, isDarkMode }) => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all") // all, completed, pending
  const [activeCategory, setActiveCategory] = useState("all")
  const [categories, setCategories] = useState([])
  const [viewMode, setViewMode] = useState("list") // list or section

  // Load tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks")
        if (storedTasks !== null) {
          const parsedTasks = JSON.parse(storedTasks)
          setTasks(parsedTasks)

          // Extract unique categories
          const uniqueCategories = [
            ...new Set(parsedTasks.map((task) => (task.category ? task.category : "Uncategorized"))),
          ]
          setCategories(uniqueCategories)
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load tasks")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  // Filter tasks based on active filters
  useEffect(() => {
    let result = [...tasks]

    // Filter by completion status
    if (activeFilter === "completed") {
      result = result.filter((task) => task.completed)
    } else if (activeFilter === "pending") {
      result = result.filter((task) => !task.completed)
    }

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((task) =>
        activeCategory === "Uncategorized" ? !task.category || task.category === "" : task.category === activeCategory,
      )
    }

    setFilteredTasks(result)
  }, [tasks, activeFilter, activeCategory])

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
      } catch (error) {
        Alert.alert("Error", "Failed to save tasks")
        console.error(error)
      }
    }

    if (!isLoading) {
      saveTasks()
    }
  }, [tasks, isLoading])

  const addTask = (newTask) => {
    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category || "Uncategorized",
      completed: false,
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)

    // Update categories if needed
    if (newTask.category && !categories.includes(newTask.category)) {
      setCategories([...categories, newTask.category])
    }

    setModalVisible(false)
  }

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== id))
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  // For SectionList
  const getSections = () => {
    const sections = {}

    filteredTasks.forEach((task) => {
      const category = task.category || "Uncategorized"
      if (!sections[category]) {
        sections[category] = []
      }
      sections[category].push(task)
    })

    return Object.keys(sections).map((key) => ({
      title: key,
      data: sections[key],
    }))
  }

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }, styles.centered]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      <HomeHeader
        title="My Tasks"
        viewMode={viewMode}
        setViewMode={setViewMode}
        navigation={navigation}
        isDarkMode={isDarkMode}
      />

      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        isDarkMode={isDarkMode}
      />

      {filteredTasks.length === 0 ? (
        <EmptyTaskList hasAnyTasks={tasks.length > 0} isDarkMode={isDarkMode} />
      ) : viewMode === "list" ? (
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTaskCompletion}
          onDelete={deleteTask}
          onPress={(taskId) => navigation.navigate("TaskDetails", { taskId })}
          isDarkMode={isDarkMode}
        />
      ) : (
        <TaskSectionList
          sections={getSections()}
          onToggle={toggleTaskCompletion}
          onDelete={deleteTask}
          onPress={(taskId) => navigation.navigate("TaskDetails", { taskId })}
          isDarkMode={isDarkMode}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={addTask}
        isDarkMode={isDarkMode}
        categories={categories}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
})

export default HomeScreen
