import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    COLORS,
    RADIUS,
    TYPOGRAPHY,
} from "../constants/theme";

export default function StatusBadge({
  status,
}) {
  const normalizedStatus =
    status?.toLowerCase();

  let backgroundColor = COLORS.beige;
  let textColor = COLORS.textSecondary;

  if (
    normalizedStatus === "open" ||
    normalizedStatus === "ready" ||
    normalizedStatus === "completed"
  ) {
    backgroundColor = COLORS.sageLight;
    textColor = COLORS.success;
  }

  if (
    normalizedStatus === "busy" ||
    normalizedStatus === "preparing"
  ) {
    backgroundColor = "#F0E2D3";
    textColor = COLORS.warning;
  }

  if (
    normalizedStatus === "closed" ||
    normalizedStatus === "cancelled"
  ) {
    backgroundColor = "#F0DCD8";
    textColor = COLORS.danger;
  }

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor },
      ]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: textColor },
        ]}
      />

      <Text
        style={[
          styles.text,
          { color: textColor },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: RADIUS.round,
    paddingHorizontal: 9,
    paddingVertical: 5,
    gap: 5,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  text: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    textTransform: "capitalize",
  },
});