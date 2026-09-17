import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Cafes</Text>
      <Text style={styles.text}>Your favorite cafes will appear here.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    padding: 24,
  },
  title: {
    fontFamily: TYPOGRAPHY.screenTitle.fontFamily,
    fontSize: 30,
    color: COLORS.text,
  },
  text: {
    marginTop: 10,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    color: COLORS.textLight,
  },
});