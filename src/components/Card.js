import {
  StyleSheet,
  View,
} from "react-native";

import {
  COLORS,
  RADIUS,
  SHADOWS,
  SPACING,
} from "../constants/theme";

export default function Card({
  children,
  style,
  padding = SPACING.lg,
}) {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.xl,
    ...SHADOWS.card,
  },
});