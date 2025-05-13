import { View, Text, StyleSheet, ImageBackground } from "react-native"
import image from '../assets/Fotolia_25783431_Subscription_XL.jpg'; // עדכן עם הנתיב הנכון לתמונה שלך

const TaskDetailsHeader = ({ title, isDarkMode }) => {
  return (
    <ImageBackground
      source={require('../assets/Fotolia_25783431_Subscription_XL.jpg')}
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
