import {
    Coffee,
} from "lucide-react-native";

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

export default function EmptyState({
  title = "Nothing here yet",
  message = "Your LocalCup content will appear here.",
  icon,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon || (
          <Coffee
            size={30}
            color={COLORS.caramel}
          />
        )}
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

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
    paddingHorizontal: 30,
    paddingVertical: 50,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  title: {
    fontFamily: TYPOGRAPHY.sectionTitle.fontFamily,
    fontSize: 19,
    color: COLORS.text,
    textAlign: "center",
  },

  message: {
    marginTop: 8,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 21,
  },
});