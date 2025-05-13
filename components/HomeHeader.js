import { View, Text, StyleSheet, TouchableOpacity,ImageBackground } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const HomeHeader = ({ title, viewMode, setViewMode, navigation, isDarkMode }) => {
  return (
    <ImageBackground
          source={require('../assets/Fotolia_25783431_Subscription_XL.jpg')}
          style={styles.headerImage}
          imageStyle={{ borderRadius: 8, opacity: 0.7 }}
        >
       
    <View style={styles.header}>
      <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>{title}</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === "list" ? "section" : "list")}
          style={styles.iconButton}
        >
          <Ionicons
            name={viewMode === "list" ? "list" : "grid-outline"}
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Categories")} style={styles.iconButton}>
          <Ionicons name="folder-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.iconButton}>
          <Ionicons name="settings-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
})

export default HomeHeader
