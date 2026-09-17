import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    COLORS,
    SCREEN,
} from "../constants/theme";

export default function Screen({
  children,
  scroll = true,
  keyboard = false,
  style,
  contentContainerStyle,
}) {
  const content = scroll ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.content,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.content,
        contentContainerStyle,
      ]}
    >
      {children}
    </View>
  );

  const wrappedContent = keyboard ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.safeArea, style]}
    >
      {wrappedContent}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  flex: {
    flex: 1,
  },

  content: {
    paddingHorizontal: SCREEN.horizontalPadding,
    paddingTop: SCREEN.verticalPadding,
    paddingBottom: 32,
  },
});