import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    COLORS,
    SPACING,
    TYPOGRAPHY,
} from "../constants/theme";

export default function SectionHeader({
  title,
  subtitle,
  actionText,
  onActionPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {actionText && (
        <Pressable
          onPress={onActionPress}
          hitSlop={8}
        >
          <Text style={styles.action}>
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontFamily: TYPOGRAPHY.sectionTitle.fontFamily,
    fontSize: TYPOGRAPHY.sectionTitle.fontSize,
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 3,
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    color: COLORS.textSecondary,
  },

  action: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 13,
    color: COLORS.caramel,
  },
});