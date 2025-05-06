"use client"

import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, Linking, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"

const SettingsScreen = ({ isDarkMode, toggleTheme }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)

  useEffect(() => {
    // Load settings from AsyncStorage
    const loadSettings = async () => {
      try {
        const notifications = await AsyncStorage.getItem("notifications")
        const sound = await AsyncStorage.getItem("sound")
        const vibration = await AsyncStorage.getItem("vibration")

        if (notifications !== null) setNotificationsEnabled(notifications === "true")
        if (sound !== null) setSoundEnabled(sound === "true")
        if (vibration !== null) setVibrationEnabled(vibration === "true")
      } catch (error) {
        console.error("Failed to load settings:", error)
      }
    }

    loadSettings()
  }, [])

  const saveSettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString())
    } catch (error) {
      console.error(`Failed to save ${key} setting:`, error)
    }
  }

  const toggleNotifications = (value) => {
    setNotificationsEnabled(value)
    saveSettings("notifications", value)
  }

  const toggleSound = (value) => {
    setSoundEnabled(value)
    saveSettings("sound", value)
  }

  const toggleVibration = (value) => {
    setVibrationEnabled(value)
    saveSettings("vibration", value)
  }

  const clearAllTasks = () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          onPress: async () => {
            try {
              await AsyncStorage.setItem("tasks", JSON.stringify([]))
              Alert.alert("Success", "All tasks have been cleared")
            } catch (error) {
              Alert.alert("Error", "Failed to clear tasks")
              console.error(error)
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  const clearAllCategories = () => {
    Alert.alert(
      "Reset Categories",
      "Are you sure you want to reset all categories? This will not delete your tasks but will remove custom categories.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: async () => {
            try {
              const storedTasks = await AsyncStorage.getItem("tasks")
              if (storedTasks !== null) {
                const tasks = JSON.parse(storedTasks)
                const updatedTasks = tasks.map((task) => ({
                  ...task,
                  category: "Uncategorized",
                }))
                await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))
                Alert.alert("Success", "All categories have been reset")
              }
            } catch (error) {
              Alert.alert("Error", "Failed to reset categories")
              console.error(error)
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  const openWebsite = () => {
    Linking.openURL("https://reactnative.dev")
  }

  const exportData = async () => {
    try {
      const tasks = await AsyncStorage.getItem("tasks")
      if (tasks) {
        Alert.alert(
          "Export Data",
          "Here is your data in JSON format. You can copy it to save elsewhere.",
          [
            {
              text: "OK",
              style: "default",
            },
          ],
          { cancelable: true },
        )
        console.log(tasks) // In a real app, you'd implement proper export functionality
      } else {
        Alert.alert("No Data", "There is no data to export.")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to export data")
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Appearance</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={22}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingLabel, { color: isDarkMode ? "#fff" : "#000" }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Notifications</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingLabel, { color: isDarkMode ? "#fff" : "#000" }]}>Enable Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Ionicons
                name="volume-medium-outline"
                size={22}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingLabel, { color: isDarkMode ? "#fff" : "#000" }]}>Sound</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={soundEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Ionicons
                name="phone-portrait-outline"
                size={22}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingLabel, { color: isDarkMode ? "#fff" : "#000" }]}>Vibration</Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={toggleVibration}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={vibrationEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Data Management</Text>
          <TouchableOpacity style={styles.settingItem} onPress={clearAllTasks}>
            <View style={styles.settingLabelContainer}>
              <Ionicons name="trash-outline" size={22} color="#f44336" style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: "#f44336" }]}>Clear All Tasks</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={isDarkMode ? "#aaa" : "#666"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={clearAllCategories}>
            <View style={styles.settingLabelContainer}>
              <Ionicons name="folder-outline" size={22} color="#ff9800" style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: "#ff9800" }]}>Reset Categories</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={isDarkMode ? "#aaa" : "#666"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={exportData}>
            <View style={styles.settingLabelContainer}>
              <Ionicons
                name="download-outline"
                size={22}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingLabel, { color: isDarkMode ? "#fff" : "#000" }]}>Export Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={isDarkMode ? "#aaa" : "#666"} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>About</Text>
          <TouchableOpacity style={styles.settingItem} onPress={openWebsite}>
            <View style={styles.settingLabelContainer}>
              <Ionicons
                name="globe-outline"
                size={22}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingLabel, { color: isDarkMode ? "#fff" : "#000" }]}>
                Visit React Native Website
              </Text>
            </View>
            <Ionicons name="open-outline" size={22} color={isDarkMode ? "#aaa" : "#666"} />
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.settingIcon}
              />
              <Text style={[styles.settingLabel, { color: isDarkMode ? "#fff" : "#000" }]}>App Version</Text>
            </View>
            <Text style={[styles.versionText, { color: isDarkMode ? "#aaa" : "#666" }]}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  versionText: {
    fontSize: 16,
  },
})

export default SettingsScreen
