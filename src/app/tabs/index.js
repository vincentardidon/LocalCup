import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  ArrowRight,
  Coffee,
  Heart,
  MapPin,
  Search,
  ShoppingBag,
  Star
} from "lucide-react-native";

import {
  COLORS,
  RADIUS,
  SCREEN,
  SHADOWS,
  TYPOGRAPHY
} from "../../constants/theme";

import { useLocalCup } from "../../context/LocalCupContext";


// --------------------------------------------------
// MOCK CAFE DATA
// --------------------------------------------------

const CAFES = [
  {
    id: "1",
    name: "Hearth & Brew",
    category: "Specialty Coffee",
    rating: 4.9,
    distance: "0.8 km",
    prepTime: "8–12 min",
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    name: "Daily Grind",
    category: "Coffee & Pastries",
    rating: 4.8,
    distance: "1.2 km",
    prepTime: "10–15 min",
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "3",
    name: "Bean & Bloom",
    category: "Modern Cafe",
    rating: 4.7,
    distance: "1.6 km",
    prepTime: "12–18 min",
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "4",
    name: "Little Roasters",
    category: "Local Coffee",
    rating: 4.6,
    distance: "2.1 km",
    prepTime: "8–14 min",
    status: "Closed",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
];


// --------------------------------------------------
// MOCK DRINK DATA
// --------------------------------------------------

const DRINKS = [
  {
    id: "1",
    name: "Spanish Latte",
    cafe: "Hearth & Brew",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "2",
    name: "Caramel Macchiato",
    cafe: "Daily Grind",
    price: 155,
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "3",
    name: "Iced Americano",
    cafe: "Bean & Bloom",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "4",
    name: "Matcha Latte",
    cafe: "Hearth & Brew",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "5",
    name: "Vanilla Cold Brew",
    cafe: "Daily Grind",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "6",
    name: "Cappuccino",
    cafe: "Little Roasters",
    price: 135,
    image:
      "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=700&q=80",
  },
];


// --------------------------------------------------
// MAIN HOME SCREEN
// --------------------------------------------------

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const {
    favorites,
    toggleFavorite,
    addToCart,
  } = useLocalCup();

  // Search cafes and drinks locally
  const filteredCafes = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return CAFES;
    }

    return CAFES.filter(
      (cafe) =>
        cafe.name.toLowerCase().includes(keyword) ||
        cafe.category.toLowerCase().includes(keyword)
    );
  }, [search]);

  const filteredDrinks = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return DRINKS;
    }

    return DRINKS.filter(
      (drink) =>
        drink.name.toLowerCase().includes(keyword) ||
        drink.cafe.toLowerCase().includes(keyword)
    );
  }, [search]);

  const featuredCafe = CAFES[0];

  return (
    <View style={styles.screen}>
      <FlatList
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View>

            {/* -------------------------------- */}
            {/* GREETING */}
            {/* -------------------------------- */}

            <View style={styles.topArea}>
              <View style={styles.locationRow}>
                <View style={styles.locationIcon}>
                  <MapPin
                    size={16}
                    color={COLORS.caramel}
                  />
                </View>

                <View>
                  <Text style={styles.locationLabel}>
                    Your location
                  </Text>

                  <Pressable
                    style={styles.nearYou}
                    onPress={() => {}}
                  >
                    <Text style={styles.nearYouText}>
                      Near you
                    </Text>

                    <ArrowRight
                      size={14}
                      color={COLORS.espresso}
                    />
                  </Pressable>
                </View>
              </View>

              <Text style={styles.eyebrow}>
                LOCALCUP
              </Text>

              <Text style={styles.greeting}>
                Good morning, Sahh
              </Text>

              <Text style={styles.subtitle}>
                Find your next favorite cup.
              </Text>
            </View>


            {/* -------------------------------- */}
            {/* SEARCH */}
            {/* -------------------------------- */}

            <View style={styles.realSearchContainer}>
              <Search
                size={20}
                color={COLORS.textMuted}
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search cafes, coffee, or drinks"
                placeholderTextColor={COLORS.textMuted}
                style={styles.searchInput}
                returnKeyType="search"
              />

              {search.length > 0 && (
                <Pressable
                  onPress={() => setSearch("")}
                  hitSlop={8}
                >
                  <Text style={styles.clearText}>×</Text>
                </Pressable>
                 )}
              </View>

            {/* -------------------------------- */}
            {/* FEATURED CAFE */}
            {/* -------------------------------- */}

            <SectionTitle
              title="Featured cafe"
              action="View all"
              onPress={() => router.push("/discover")}
            />

            <Pressable
              onPress={() =>
                router.push(`/cafe/${featuredCafe.id}`)
              }
              style={({ pressed }) => [
                styles.featuredCard,
                pressed && styles.pressed,
              ]}
            >
              <Image
                source={{ uri: featuredCafe.image }}
                style={styles.featuredImage}
              />

              <View style={styles.featuredOverlay} />

              <Pressable
                onPress={() =>
                  toggleFavorite(featuredCafe.id)
                }
                style={styles.featuredFavorite}
                hitSlop={8}
              >
                <Heart
                  size={20}
                  color={
                    favorites.includes(featuredCafe.id)
                      ? COLORS.caramel
                      : COLORS.white
                  }
                  fill={
                    favorites.includes(featuredCafe.id)
                      ? COLORS.caramel
                      : "transparent"
                  }
                />
              </Pressable>

              <View style={styles.featuredContent}>
                <View style={styles.featuredTopRow}>
                  <View style={styles.openBadge}>
                    <View style={styles.openDot} />
                    <Text style={styles.openText}>
                      {featuredCafe.status}
                    </Text>
                  </View>

                  <View style={styles.ratingBadge}>
                    <Star
                      size={13}
                      color={COLORS.caramel}
                      fill={COLORS.caramel}
                    />

                    <Text style={styles.ratingText}>
                      {featuredCafe.rating}
                    </Text>
                  </View>
                </View>

                <Text style={styles.featuredName}>
                  {featuredCafe.name}
                </Text>

                <Text style={styles.featuredCategory}>
                  {featuredCafe.category}
                </Text>

                <View style={styles.featuredBottom}>
                  <View style={styles.distanceRow}>
                    <MapPin
                      size={14}
                      color={COLORS.white}
                    />

                    <Text style={styles.distanceText}>
                      {featuredCafe.distance}
                    </Text>

                    <Text style={styles.dotSeparator}>
                      •
                    </Text>

                    <Text style={styles.distanceText}>
                      {featuredCafe.prepTime}
                    </Text>
                  </View>

                  <View style={styles.viewCafe}>
                    <Text style={styles.viewCafeText}>
                      View Cafe
                    </Text>

                    <ArrowRight
                      size={16}
                      color={COLORS.espresso}
                    />
                  </View>
                </View>
              </View>
            </Pressable>


            {/* -------------------------------- */}
            {/* NEARBY CAFES */}
            {/* -------------------------------- */}

            <SectionTitle
              title="Nearby cafes"
              subtitle="Independent spots around you"
              action="See all"
              onPress={() => router.push("/discover")}
            />

            {search.length > 0 &&
              filteredCafes.length === 0 && (
                <Text style={styles.noResults}>
                  No cafes found for "{search}"
                </Text>
              )}

            <FlatList
              data={filteredCafes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <CafeCard
                  cafe={item}
                  favorite={favorites.includes(item.id)}
                  onFavorite={() =>
                    toggleFavorite(item.id)
                  }
                  onPress={() =>
                    router.push(`/cafe/${item.id}`)
                  }
                />
              )}
            />


            {/* -------------------------------- */}
            {/* POPULAR DRINKS */}
            {/* -------------------------------- */}

            <SectionTitle
              title="Popular drinks"
              subtitle="What locals are ordering"
              action="Browse menu"
              onPress={() => router.push("/menu")}
            />

            {search.length > 0 &&
              filteredDrinks.length === 0 && (
                <Text style={styles.noResults}>
                  No drinks found for "{search}"
                </Text>
              )}

            <FlatList
              data={filteredDrinks}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <DrinkCard
                  drink={item}
                  favorite={favorites.includes(
                    `drink-${item.id}`
                  )}
                  onFavorite={() =>
                    toggleFavorite(`drink-${item.id}`)
                  }
                  onAdd={() =>
                    addToCart({
                      ...item,
                      quantity: 1,
                    })
                  }
                  onPress={() =>
                    router.push(`/menu/${item.id}`)
                  }
                />
              )}
            />


            {/* -------------------------------- */}
            {/* PROMOTIONAL CARD */}
            {/* -------------------------------- */}

            <View style={styles.promoCard}>
              <View style={styles.promoIcon}>
                <Coffee
                  size={25}
                  color={COLORS.caramel}
                />
              </View>

              <View style={styles.promoTextContainer}>
                <Text style={styles.promoEyebrow}>
                  ORDER AHEAD
                </Text>

                <Text style={styles.promoTitle}>
                  Skip the line.
                </Text>

                <Text style={styles.promoDescription}>
                  Order ahead and pick up when
                  you're ready.
                </Text>

                <Pressable
                  onPress={() => router.push("/menu")}
                  style={({ pressed }) => [
                    styles.promoButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.promoButtonText}>
                    Order Ahead
                  </Text>

                  <ArrowRight
                    size={16}
                    color={COLORS.white}
                  />
                </Pressable>
              </View>

              <View style={styles.promoDecor}>
                <Coffee
                  size={90}
                  color="rgba(185, 120, 69, 0.10)"
                />
              </View>
            </View>


            {/* -------------------------------- */}
            {/* QUICK ACTIONS */}
            {/* -------------------------------- */}

            <SectionTitle
              title="Quick actions"
            />

            <View style={styles.quickActions}>
              <QuickAction
                icon={
                  <MapPin
                    size={21}
                    color={COLORS.espresso}
                  />
                }
                title="Discover Cafes"
                onPress={() =>
                  router.push("/discover")
                }
              />

              <QuickAction
                icon={
                  <Coffee
                    size={21}
                    color={COLORS.espresso}
                  />
                }
                title="Browse Drinks"
                onPress={() =>
                  router.push("/menu")
                }
              />

              <QuickAction
                icon={
                  <ShoppingBag
                    size={21}
                    color={COLORS.espresso}
                  />
                }
                title="View Orders"
                onPress={() =>
                  router.push("/orders")
                }
              />
            </View>


            {/* -------------------------------- */}
            {/* BOTTOM SPACE */}
            {/* -------------------------------- */}

            <View style={{ height: 20 }} />

          </View>
        }
      />
    </View>
  );
}


// --------------------------------------------------
// SEARCH INPUT
// --------------------------------------------------

function SearchInput({
  value,
  onChangeText,
}) {
  const { TextInput } = require("react-native");

  return (
    <View style={styles.realSearchContainer}>
      <Search
        size={20}
        color={COLORS.textMuted}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search cafes, coffee, or drinks"
        placeholderTextColor={COLORS.textMuted}
        style={styles.searchInput}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText("")}
          hitSlop={8}
        >
          <Text style={styles.clearText}>
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );
}


// --------------------------------------------------
// SECTION TITLE
// --------------------------------------------------

function SectionTitle({
  title,
  subtitle,
  action,
  onPress,
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        {subtitle && (
          <Text style={styles.sectionSubtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {action && (
        <Pressable
          onPress={onPress}
          hitSlop={8}
        >
          <Text style={styles.sectionAction}>
            {action}
          </Text>
        </Pressable>
      )}
    </View>
  );
}


// --------------------------------------------------
// CAFE CARD
// --------------------------------------------------

function CafeCard({
  cafe,
  favorite,
  onFavorite,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cafeCard,
        pressed && styles.pressed,
      ]}
    >
      <View>
        <Image
          source={{ uri: cafe.image }}
          style={styles.cafeImage}
        />

        <Pressable
          onPress={onFavorite}
          style={styles.cafeFavorite}
          hitSlop={8}
        >
          <Heart
            size={17}
            color={
              favorite
                ? COLORS.caramel
                : COLORS.espresso
            }
            fill={
              favorite
                ? COLORS.caramel
                : "transparent"
            }
          />
        </Pressable>
      </View>

      <View style={styles.cafeContent}>
        <View style={styles.cafeNameRow}>
          <Text
            style={styles.cafeName}
            numberOfLines={1}
          >
            {cafe.name}
          </Text>

          <View style={styles.miniRating}>
            <Star
              size={11}
              color={COLORS.caramel}
              fill={COLORS.caramel}
            />

            <Text style={styles.miniRatingText}>
              {cafe.rating}
            </Text>
          </View>
        </View>

        <Text style={styles.cafeCategory}>
          {cafe.category}
        </Text>

        <View style={styles.cafeMeta}>
          <MapPin
            size={12}
            color={COLORS.textMuted}
          />

          <Text style={styles.cafeMetaText}>
            {cafe.distance}
          </Text>

          <Text style={styles.metaDot}>
            •
          </Text>

          <Text style={styles.cafeMetaText}>
            {cafe.prepTime}
          </Text>
        </View>

        <View style={styles.cafeStatusRow}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  cafe.status === "Open"
                    ? COLORS.success
                    : COLORS.danger,
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              {
                color:
                  cafe.status === "Open"
                    ? COLORS.success
                    : COLORS.danger,
              },
            ]}
          >
            {cafe.status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}


// --------------------------------------------------
// DRINK CARD
// --------------------------------------------------

function DrinkCard({
  drink,
  favorite,
  onFavorite,
  onAdd,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.drinkCard,
        pressed && styles.pressed,
      ]}
    >
      <View>
        <Image
          source={{ uri: drink.image }}
          style={styles.drinkImage}
        />

        <Pressable
          onPress={onFavorite}
          style={styles.drinkFavorite}
          hitSlop={8}
        >
          <Heart
            size={17}
            color={
              favorite
                ? COLORS.caramel
                : COLORS.espresso
            }
            fill={
              favorite
                ? COLORS.caramel
                : "transparent"
            }
          />
        </Pressable>
      </View>

      <View style={styles.drinkContent}>
        <Text
          style={styles.drinkName}
          numberOfLines={1}
        >
          {drink.name}
        </Text>

        <Text
          style={styles.drinkCafe}
          numberOfLines={1}
        >
          {drink.cafe}
        </Text>

        <View style={styles.drinkBottom}>
          <Text style={styles.drinkPrice}>
            ₱{drink.price}
          </Text>

          <Pressable
            onPress={onAdd}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addPressed,
            ]}
          >
            <Text style={styles.addText}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}


// --------------------------------------------------
// QUICK ACTION
// --------------------------------------------------

function QuickAction({
  icon,
  title,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickAction,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.quickIcon}>
        {icon}
      </View>

      <Text style={styles.quickText}>
        {title}
      </Text>

      <ArrowRight
        size={16}
        color={COLORS.textMuted}
      />
    </Pressable>
  );
}


// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  scrollContent: {
    paddingHorizontal: SCREEN.horizontalPadding,
    paddingTop: 14,
    paddingBottom: 30,
  },

  topArea: {
    marginBottom: 18,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  locationIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  locationLabel: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textMuted,
  },

  nearYou: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },

  nearYouText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 13,
    color: COLORS.espresso,
  },

  eyebrow: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.caramel,
    marginBottom: 7,
  },

  greeting: {
    fontFamily: TYPOGRAPHY.hero.fontFamily,
    fontSize: 31,
    lineHeight: 39,
    color: COLORS.text,
  },

  subtitle: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  searchContainer: {
    height: 54,
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    gap: 10,
    opacity: 0,
    position: "absolute",
    left: 20,
    right: 20,
    top: 147,
  },

  searchTouchArea: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 147,
    height: 54,
    zIndex: 1,
  },

  realSearchContainer: {
    height: 54,
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    gap: 10,
    marginBottom: 30,
    ...SHADOWS.card,
  },

  searchPlaceholder: {
    flex: 1,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    color: COLORS.textMuted,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    color: COLORS.text,
  },

  clearText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
    lineHeight: 24,
    color: COLORS.textMuted,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 3,
  },

  sectionTitleContainer: {
    flex: 1,
  },

  sectionTitle: {
    fontFamily: TYPOGRAPHY.sectionTitle.fontFamily,
    fontSize: TYPOGRAPHY.sectionTitle.fontSize,
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  sectionAction: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 12,
    color: COLORS.caramel,
  },

  featuredCard: {
    height: 300,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 30,
    backgroundColor: COLORS.espresso,
  },

  featuredImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(30, 18, 13, 0.48)",
  },

  featuredFavorite: {
    position: "absolute",
    right: 15,
    top: 15,
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
  },

  featuredContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 19,
  },

  featuredTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },

  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: RADIUS.round,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },

  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#B8D3A9",
  },

  openText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.white,
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.round,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  ratingText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 12,
    color: COLORS.text,
  },

  featuredName: {
    fontFamily: TYPOGRAPHY.screenTitle.fontFamily,
    fontSize: 26,
    color: COLORS.white,
  },

  featuredCategory: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    marginTop: 2,
  },

  featuredBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  distanceText: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    color: COLORS.white,
  },

  dotSeparator: {
    color: "rgba(255,255,255,0.5)",
    marginHorizontal: 2,
  },

  viewCafe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.round,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  viewCafeText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.espresso,
  },

  horizontalList: {
    paddingRight: 10,
    paddingBottom: 6,
  },

  cafeCard: {
    width: 245,
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.xl,
    marginRight: 14,
    overflow: "hidden",
    ...SHADOWS.card,
  },

  cafeImage: {
    width: "100%",
    height: 145,
  },

  cafeFavorite: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,252,247,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  cafeContent: {
    padding: 14,
  },

  cafeNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  cafeName: {
    flex: 1,
    fontFamily: TYPOGRAPHY.cafeName.fontFamily,
    fontSize: 16,
    color: COLORS.text,
  },

  miniRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  miniRatingText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.text,
  },

  cafeCategory: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  cafeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 11,
    gap: 4,
  },

  cafeMetaText: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  metaDot: {
    color: COLORS.textMuted,
  },

  cafeStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  statusText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
  },

  drinkCard: {
    width: 205,
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.xl,
    marginRight: 14,
    overflow: "hidden",
    ...SHADOWS.card,
  },

  drinkImage: {
    width: "100%",
    height: 170,
  },

  drinkFavorite: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,252,247,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  drinkContent: {
    padding: 14,
  },

  drinkName: {
    fontFamily: TYPOGRAPHY.productName.fontFamily,
    fontSize: 15,
    color: COLORS.text,
  },

  drinkCafe: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  drinkBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },

  drinkPrice: {
    fontFamily: TYPOGRAPHY.price.fontFamily,
    fontSize: 16,
    color: COLORS.espresso,
  },

  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.espresso,
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 22,
    lineHeight: 22,
    color: COLORS.white,
  },

  addPressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.8,
  },

  promoCard: {
    minHeight: 205,
    backgroundColor: COLORS.espresso,
    borderRadius: 25,
    marginTop: 28,
    marginBottom: 30,
    padding: 20,
    overflow: "hidden",
    position: "relative",
  },

  promoIcon: {
    width: 47,
    height: 47,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.09)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  promoTextContainer: {
    zIndex: 2,
  },

  promoEyebrow: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    letterSpacing: 1.5,
    color: COLORS.caramelLight,
  },

  promoTitle: {
    fontFamily: TYPOGRAPHY.screenTitle.fontFamily,
    fontSize: 26,
    color: COLORS.white,
    marginTop: 2,
  },

  promoDescription: {
    width: "72%",
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.68)",
    marginTop: 4,
  },

  promoButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.caramel,
    borderRadius: RADIUS.round,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 15,
  },

  promoButtonText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 12,
    color: COLORS.white,
  },

  promoDecor: {
    position: "absolute",
    right: -12,
    bottom: -8,
    transform: [{ rotate: "-15deg" }],
  },

  quickActions: {
    gap: 10,
  },

  quickAction: {
    minHeight: 65,
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    ...SHADOWS.card,
  },

  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  quickText: {
    flex: 1,
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 13,
    color: COLORS.text,
  },

  noResults: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    color: COLORS.textSecondary,
    marginBottom: 15,
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});