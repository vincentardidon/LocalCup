import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
    COLORS,
    TYPOGRAPHY,
} from "../constants/theme";

export default function LoadingState({
  message = "Loading LocalCup...",
  fullScreen = false,
}) {
  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>☕</Text>
      </View>

      <ActivityIndicator
        size="small"
        color={COLORS.caramel}
      />

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  icon: {
    fontSize: 28,
  },

  message: {
    marginTop: 12,
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: COLORS.textSecondary,
  },
});