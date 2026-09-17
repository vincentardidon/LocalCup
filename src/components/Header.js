import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ChevronLeft,
} from "lucide-react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../constants/theme";

export default function Header({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <Pressable
            onPress={onBackPress}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
            hitSlop={8}
          >
            <ChevronLeft
              size={22}
              color={COLORS.espresso}
            />
          </Pressable>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightAction && (
        <View style={styles.rightAction}>
          {rightAction}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.xl,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontFamily: TYPOGRAPHY.screenTitle.fontFamily,
    fontSize: TYPOGRAPHY.screenTitle.fontSize,
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 4,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  rightAction: {
    marginLeft: 12,
  },

  pressed: {
    opacity: 0.65,
  },
});