import { View, Text, StyleSheet, ImageBackground } from "react-native"

const TaskDetailsHeader = ({ title, isDarkMode }) => {
  return (
    <ImageBackground
      source={{ uri: "https://picsum.photos/800/200" }}
      style={styles.headerImage}
      imageStyle={{ borderRadius: 8, opacity: 0.7 }}
    >
      <View style={styles.headerOverlay}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    height: 150,
    justifyContent: "flex-end",
    marginBottom: 16,
    borderRadius: 8,
  },
  headerOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
})

export default TaskDetailsHeader
