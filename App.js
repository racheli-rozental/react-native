"use client"

import "react-native-gesture-handler"
import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "expo-status-bar"
import { ActivityIndicator, View } from "react-native"

// Import screens
import HomeScreen from "./screens/HomeScreen"
import TaskDetailsScreen from "./screens/TaskDetailsScreen"
import SettingsScreen from "./screens/SettingsScreen"
import CategoriesScreen from "./screens/CategoriesScreen"

const Stack = createStackNavigator()

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Load theme preference from storage
    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem("theme")
        if (theme !== null) {
          setIsDarkMode(theme === "dark")
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    try {
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light")
    } catch (error) {
      console.error("Failed to save theme preference:", error)
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? "#333" : "#f8f8f8",
            },
            headerTintColor: isDarkMode ? "#fff" : "#000",
          }}
        >
          <Stack.Screen name="Home" options={{ title: "My Tasks" }}>
            {(props) => <HomeScreen {...props} isDarkMode={isDarkMode} />}
          </Stack.Screen>
          <Stack.Screen name="TaskDetails" options={{ title: "Task Details" }}>
            {(props) => <TaskDetailsScreen {...props} isDarkMode={isDarkMode} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={{ title: "Settings" }}>
            {(props) => <SettingsScreen {...props} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
          </Stack.Screen>
          <Stack.Screen name="Categories" options={{ title: "Categories" }}>
            {(props) => <CategoriesScreen {...props} isDarkMode={isDarkMode} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
