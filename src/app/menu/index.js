import { useMemo, useState } from "react";

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";


import { useRouter } from "expo-router";

import CategoryTabs from "../../components/CategoryTabs";
import CoffeeMenuCard from "../../components/CoffeeMenuCard";

import {
  MENU_CATEGORIES,
  MENU_ITEMS,
} from "../../data/menuData";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";

export default function MenuScreen() {
  const router = useRouter();

  const [category, setCategory] = useState("Featured");
  const [favorites, setFavorites] = useState([]);

  const filteredItems = useMemo(() => {
    if (category === "Featured") {
      return MENU_ITEMS.filter((item) => item.featured);
    }

    return MENU_ITEMS.filter(
      (item) => item.category === category
    );
  }, [category]);

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      if (current.includes(id)) {
        return current.filter(
          (favoriteId) => favoriteId !== id
        );
      }

      return [...current, id];
    });
  };

  const openProduct = (item) => {
    router.push(`/menu/${item.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>
          LOCALCUP MENU
        </Text>

        <Text style={styles.title}>
          Find your cup.
        </Text>

        <Text style={styles.subtitle}>
          Handcrafted drinks and fresh favorites from local cafes.
        </Text>
      </View>

      <CategoryTabs
        categories={MENU_CATEGORIES}
        selectedCategory={category}
        onSelect={setCategory}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoffeeMenuCard
            item={item}
            isFavorite={favorites.includes(item.id)}
            onFavorite={toggleFavorite}
            onPress={() => openProduct(item)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        windowSize={7}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              Nothing here yet
            </Text>

            <Text style={styles.emptyText}>
              Try another menu category.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: SPACING.screen,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },

  eyebrow: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 12,
    letterSpacing: 1.6,
    color: COLORS.accent,
    marginBottom: 7,
  },

  title: {
    fontFamily: TYPOGRAPHY.hero.fontFamily,
    fontSize: 34,
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 7,
    maxWidth: 330,
    lineHeight: 21,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    color: COLORS.textMuted,
  },

  list: {
    paddingHorizontal: SPACING.screen,
    paddingTop: 4,
    paddingBottom: 120,
  },

  empty: {
    paddingTop: 70,
    alignItems: "center",
  },

  emptyTitle: {
    fontFamily: TYPOGRAPHY.productName.fontFamily,
    fontSize: 20,
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 6,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    color: COLORS.textMuted,
  },
});