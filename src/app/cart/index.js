import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.text}>
        Your selected coffee items will appear here.
      </Text>
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
    color: COLORS.textLight,
  },
});