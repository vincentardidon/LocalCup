import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from "../constants/theme";

export default function Button({
  title,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  style,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" || variant === "secondary"
              ? COLORS.white
              : COLORS.espresso
          }
        />
      ) : (
        <View style={styles.content}>
          {icon && (
            <View style={styles.icon}>
              {icon}
            </View>
          )}

          <Text
            style={[
              styles.text,
              variant === "outline" && styles.outlineText,
              variant === "ghost" && styles.ghostText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export function PrimaryButton(props) {
  return (
    <Button
      {...props}
      variant="primary"
    />
  );
}

export function SecondaryButton(props) {
  return (
    <Button
      {...props}
      variant="secondary"
    />
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
  },

  primary: {
    backgroundColor: COLORS.espresso,
  },

  secondary: {
    backgroundColor: COLORS.caramel,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.espresso,
  },

  ghost: {
    backgroundColor: COLORS.beige,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    marginRight: 8,
  },

  text: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: TYPOGRAPHY.button.fontSize,
    color: COLORS.white,
  },

  outlineText: {
    color: COLORS.espresso,
  },

  ghostText: {
    color: COLORS.espresso,
  },

  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.985 }],
  },

  disabled: {
    opacity: 0.45,
  },
});