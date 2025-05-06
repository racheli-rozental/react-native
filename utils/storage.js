import AsyncStorage from "@react-native-async-storage/async-storage"

// Save tasks to AsyncStorage
export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
    return true
  } catch (error) {
    console.error("Error saving tasks:", error)
    return false
  }
}

// Load tasks from AsyncStorage
export const loadTasks = async () => {
  try {
    const tasksJson = await AsyncStorage.getItem("tasks")
    return tasksJson ? JSON.parse(tasksJson) : []
  } catch (error) {
    console.error("Error loading tasks:", error)
    return []
  }
}

// Save theme preference
export const saveTheme = async (isDarkMode) => {
  try {
    await AsyncStorage.setItem("theme", isDarkMode ? "dark" : "light")
    return true
  } catch (error) {
    console.error("Error saving theme:", error)
    return false
  }
}

// Load theme preference
export const loadTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem("theme")
    return theme === "dark"
  } catch (error) {
    console.error("Error loading theme:", error)
    return false
  }
}

// Save categories
export const saveCategories = async (categories) => {
  try {
    await AsyncStorage.setItem("categories", JSON.stringify(categories))
    return true
  } catch (error) {
    console.error("Error saving categories:", error)
    return false
  }
}

// Load categories
export const loadCategories = async () => {
  try {
    const categoriesJson = await AsyncStorage.getItem("categories")
    return categoriesJson ? JSON.parse(categoriesJson) : ["Uncategorized"]
  } catch (error) {
    console.error("Error loading categories:", error)
    return ["Uncategorized"]
  }
}
