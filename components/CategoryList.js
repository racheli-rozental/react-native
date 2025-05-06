import { FlatList, StyleSheet } from "react-native"
import CategoryItem from "./CategoryItem"

const CategoryList = ({ categories, onEdit, onDelete, isDarkMode }) => {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryItem category={item} onEdit={onEdit} onDelete={onDelete} isDarkMode={isDarkMode} />
      )}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
})

export default CategoryList
