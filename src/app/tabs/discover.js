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

import MapView, { Marker } from "react-native-maps";

import {
  ArrowRight,
  Coffee,
  Heart,
  MapPin,
  Search,
  Star,
  X,
} from "lucide-react-native";

import { router } from "expo-router";

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
    category: "Roasters",
    rating: 4.9,
    distance: "0.8 km",
    prepTime: "8–12 min",
    status: "Open",
    independent: true,
    latitude: 10.3157,
    longitude: 123.8854,
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    name: "Daily Grind",
    category: "Cafe",
    rating: 4.8,
    distance: "1.2 km",
    prepTime: "10–15 min",
    status: "Open",
    independent: true,
    latitude: 10.3175,
    longitude: 123.8912,
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "3",
    name: "Bean & Bloom",
    category: "Cafe",
    rating: 4.7,
    distance: "1.6 km",
    prepTime: "12–18 min",
    status: "Open",
    independent: true,
    latitude: 10.3115,
    longitude: 123.8787,
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "4",
    name: "Little Roasters",
    category: "Roasters",
    rating: 4.6,
    distance: "2.1 km",
    prepTime: "8–14 min",
    status: "Closed",
    independent: true,
    latitude: 10.3208,
    longitude: 123.8822,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "5",
    name: "The Daily Loaf",
    category: "Bakery",
    rating: 4.5,
    distance: "2.5 km",
    prepTime: "10–16 min",
    status: "Open",
    independent: true,
    latitude: 10.3092,
    longitude: 123.8928,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  },
];


// --------------------------------------------------
// FILTERS
// --------------------------------------------------

const FILTERS = [
  "Nearby",
  "Open Now",
  "Highly Rated",
  "Independent",
  "Roasters",
  "Cafe",
  "Bakery",
];


// --------------------------------------------------
// DEFAULT MAP LOCATION
// --------------------------------------------------

const DEFAULT_REGION = {
  latitude: 10.3157,
  longitude: 123.8854,
  latitudeDelta: 0.035,
  longitudeDelta: 0.035,
};


// --------------------------------------------------
// MAIN SCREEN
// --------------------------------------------------

export default function DiscoverScreen() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("Nearby");

  const [selectedCafe, setSelectedCafe] =
    useState(CAFES[0]);

  const {
    favorites,
    toggleFavorite,
  } = useLocalCup();


  // ------------------------------------------------
  // FILTER + SEARCH
  // ------------------------------------------------

  const filteredCafes = useMemo(() => {
    let results = [...CAFES];

    const keyword = search
      .toLowerCase()
      .trim();

    // Search
    if (keyword) {
      results = results.filter(
        (cafe) =>
          cafe.name
            .toLowerCase()
            .includes(keyword) ||
          cafe.category
            .toLowerCase()
            .includes(keyword)
      );
    }

    // Filters
    if (selectedFilter === "Open Now") {
      results = results.filter(
        (cafe) => cafe.status === "Open"
      );
    }

    if (selectedFilter === "Highly Rated") {
      results = results.filter(
        (cafe) => cafe.rating >= 4.8
      );
    }

    if (selectedFilter === "Independent") {
      results = results.filter(
        (cafe) => cafe.independent
      );
    }

    if (
      selectedFilter === "Roasters" ||
      selectedFilter === "Cafe" ||
      selectedFilter === "Bakery"
    ) {
      results = results.filter(
        (cafe) =>
          cafe.category === selectedFilter
      );
    }

    return results;
  }, [search, selectedFilter]);


  // ------------------------------------------------
  // SCREEN
  // ------------------------------------------------

  return (
    <View style={styles.screen}>

      <FlatList
        data={filteredCafes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContent
        }

        ListHeaderComponent={
          <View>

            {/* -------------------------------------- */}
            {/* HEADER */}
            {/* -------------------------------------- */}

            <View style={styles.header}>

              <View>
                <Text style={styles.eyebrow}>
                  EXPLORE LOCAL
                </Text>

                <Text style={styles.title}>
                  Discover cafes
                </Text>

                <Text style={styles.subtitle}>
                  Find independent coffee spots
                  around you.
                </Text>
              </View>

              <View style={styles.locationBadge}>
                <MapPin
                  size={17}
                  color={COLORS.caramel}
                />

                <Text style={styles.locationText}>
                  Near you
                </Text>
              </View>

            </View>


            {/* -------------------------------------- */}
            {/* SEARCH */}
            {/* -------------------------------------- */}

            <View style={styles.searchBox}>

              <Search
                size={20}
                color={COLORS.textMuted}
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search cafes..."
                placeholderTextColor={
                  COLORS.textMuted
                }
                style={styles.searchInput}
                returnKeyType="search"
              />

              {search.length > 0 && (
                <Pressable
                  onPress={() =>
                    setSearch("")
                  }
                  hitSlop={8}
                >
                  <X
                    size={18}
                    color={COLORS.textMuted}
                  />
                </Pressable>
              )}

            </View>


            {/* -------------------------------------- */}
            {/* FILTERS */}
            {/* -------------------------------------- */}

            <FlatList
              data={FILTERS}
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              keyExtractor={(item) => item}
              contentContainerStyle={
                styles.filterList
              }
              renderItem={({ item }) => {

                const selected =
                  selectedFilter === item;

                return (
                  <Pressable
                    onPress={() =>
                      setSelectedFilter(item)
                    }
                    style={({ pressed }) => [
                      styles.filterChip,
                      selected &&
                        styles.filterChipSelected,
                      pressed &&
                        styles.filterPressed,
                    ]}
                  >

                    {item === "Nearby" && (
                      <MapPin
                        size={14}
                        color={
                          selected
                            ? COLORS.white
                            : COLORS.espresso
                        }
                      />
                    )}

                    {item === "Open Now" && (
                      <View
                        style={[
                          styles.filterDot,
                          {
                            backgroundColor:
                              selected
                                ? COLORS.white
                                : COLORS.success,
                          },
                        ]}
                      />
                    )}

                    {item === "Highly Rated" && (
                      <Star
                        size={14}
                        color={
                          selected
                            ? COLORS.white
                            : COLORS.caramel
                        }
                      />
                    )}

                    {(item === "Roasters" ||
                      item === "Cafe" ||
                      item === "Bakery") && (
                      <Coffee
                        size={14}
                        color={
                          selected
                            ? COLORS.white
                            : COLORS.espresso
                        }
                      />
                    )}

                    <Text
                      style={[
                        styles.filterText,
                        selected &&
                          styles.filterTextSelected,
                      ]}
                    >
                      {item}
                    </Text>

                  </Pressable>
                );
              }}
            />


            {/* -------------------------------------- */}
            {/* MAP */}
            {/* -------------------------------------- */}

            <View style={styles.mapContainer}>

              <MapView
                style={styles.map}
                initialRegion={DEFAULT_REGION}
                showsUserLocation={false}
                showsMyLocationButton={false}
                showsCompass={false}
                toolbarEnabled={false}
              >

                {filteredCafes.map((cafe) => (
                  <Marker
                    key={cafe.id}
                    coordinate={{
                      latitude:
                        cafe.latitude,
                      longitude:
                        cafe.longitude,
                    }}
                    onPress={() =>
                      setSelectedCafe(cafe)
                    }
                  >

                    <View
                      style={[
                        styles.marker,
                        selectedCafe?.id ===
                          cafe.id &&
                          styles.markerSelected,
                      ]}
                    >
                      <Coffee
                        size={16}
                        color={COLORS.white}
                      />
                    </View>

                  </Marker>
                ))}

              </MapView>


              {/* MAP LABEL */}

              <View style={styles.mapLabel}>
                <MapPin
                  size={14}
                  color={COLORS.caramel}
                />

                <Text style={styles.mapLabelText}>
                  Local cafes
                </Text>
              </View>


              {/* SELECTED CAFE PREVIEW */}

              {selectedCafe && (
                <Pressable
                  onPress={() =>
                    router.push(
                      `/cafe/${selectedCafe.id}`
                    )
                  }
                  style={({ pressed }) => [
                    styles.mapPreview,
                    pressed &&
                      styles.mapPreviewPressed,
                  ]}
                >

                  <Image
                    source={{
                      uri: selectedCafe.image,
                    }}
                    style={
                      styles.previewImage
                    }
                  />

                  <View
                    style={
                      styles.previewContent
                    }
                  >

                    <View
                      style={
                        styles.previewTop
                      }
                    >

                      <Text
                        style={
                          styles.previewName
                        }
                        numberOfLines={1}
                      >
                        {selectedCafe.name}
                      </Text>

                      <View
                        style={
                          styles.previewRating
                        }
                      >
                        <Star
                          size={11}
                          color={
                            COLORS.caramel
                          }
                          fill={
                            COLORS.caramel
                          }
                        />

                        <Text
                          style={
                            styles.previewRatingText
                          }
                        >
                          {selectedCafe.rating}
                        </Text>
                      </View>

                    </View>


                    <View
                      style={
                        styles.previewMeta
                      }
                    >

                      <View
                        style={
                          styles.previewStatus
                        }
                      >
                        <View
                          style={[
                            styles.statusDot,
                            {
                              backgroundColor:
                                selectedCafe.status ===
                                "Open"
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
                                selectedCafe.status ===
                                "Open"
                                  ? COLORS.success
                                  : COLORS.danger,
                            },
                          ]}
                        >
                          {selectedCafe.status}
                        </Text>
                      </View>

                      <Text
                        style={
                          styles.previewDistance
                        }
                      >
                        {selectedCafe.distance}
                      </Text>

                    </View>


                    <View
                      style={
                        styles.previewBottom
                      }
                    >

                      <Text
                        style={
                          styles.previewPrep
                        }
                      >
                        {selectedCafe.prepTime}
                      </Text>

                      <View
                        style={
                          styles.previewButton
                        }
                      >
                        <Text
                          style={
                            styles.previewButtonText
                          }
                        >
                          View Cafe
                        </Text>

                        <ArrowRight
                          size={14}
                          color={
                            COLORS.espresso
                          }
                        />
                      </View>

                    </View>

                  </View>

                </Pressable>
              )}

            </View>


            {/* -------------------------------------- */}
            {/* RESULTS HEADER */}
            {/* -------------------------------------- */}

            <View
              style={styles.resultsHeader}
            >

              <View>
                <Text
                  style={
                    styles.resultsTitle
                  }
                >
                  Nearby cafes
                </Text>

                <Text
                  style={
                    styles.resultsSubtitle
                  }
                >
                  {filteredCafes.length} places
                  found
                </Text>
              </View>

              <View
                style={styles.activeFilter}
              >
                <Text
                  style={
                    styles.activeFilterText
                  }
                >
                  {selectedFilter}
                </Text>
              </View>

            </View>

          </View>
        }

        renderItem={({ item }) => (
          <CafeResultCard
            cafe={item}
            favorite={favorites.includes(
              item.id
            )}
            onFavorite={() =>
              toggleFavorite(item.id)
            }
            onPress={() =>
              router.push(
                `/cafe/${item.id}`
              )
            }
          />
        )}

        ListEmptyComponent={
          <EmptyResults
            search={search}
          />
        }
      />

    </View>
  );
}


// --------------------------------------------------
// CAFE RESULT CARD
// --------------------------------------------------

function CafeResultCard({
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
        pressed && styles.cardPressed,
      ]}
    >

      <View style={styles.cafeImageContainer}>

        <Image
          source={{ uri: cafe.image }}
          style={styles.cafeImage}
        />

        <View style={styles.categoryBadge}>
          <Text
            style={styles.categoryBadgeText}
          >
            {cafe.category}
          </Text>
        </View>

        <Pressable
          onPress={onFavorite}
          style={styles.favoriteButton}
          hitSlop={8}
        >
          <Heart
            size={19}
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


      <View style={styles.cafeInfo}>

        <View style={styles.cafeNameRow}>

          <Text
            style={styles.cafeName}
            numberOfLines={1}
          >
            {cafe.name}
          </Text>

          <View style={styles.rating}>
            <Star
              size={12}
              color={COLORS.caramel}
              fill={COLORS.caramel}
            />

            <Text style={styles.ratingText}>
              {cafe.rating}
            </Text>
          </View>

        </View>


        <View style={styles.cafeMeta}>

          <View style={styles.metaItem}>
            <MapPin
              size={13}
              color={COLORS.textMuted}
            />

            <Text
              style={styles.metaText}
            >
              {cafe.distance}
            </Text>
          </View>

          <Text style={styles.separator}>
            •
          </Text>

          <Text
            style={styles.metaText}
          >
            {cafe.prepTime}
          </Text>

        </View>


        <View style={styles.cardBottom}>

          <View style={styles.statusContainer}>

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


          <View
            style={styles.viewButton}
          >
            <Text
              style={styles.viewButtonText}
            >
              View Cafe
            </Text>

            <ArrowRight
              size={15}
              color={COLORS.espresso}
            />
          </View>

        </View>

      </View>

    </Pressable>
  );
}


// --------------------------------------------------
// EMPTY RESULTS
// --------------------------------------------------

function EmptyResults({ search }) {
  return (
    <View style={styles.emptyContainer}>

      <View style={styles.emptyIcon}>
        <Coffee
          size={30}
          color={COLORS.caramel}
        />
      </View>

      <Text style={styles.emptyTitle}>
        No cafes found
      </Text>

      <Text style={styles.emptyText}>
        {search
          ? `We couldn't find a cafe matching "${search}".`
          : "Try changing your filters to see more cafes."}
      </Text>

    </View>
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

  listContent: {
    paddingHorizontal:
      SCREEN.horizontalPadding,
    paddingTop: 16,
    paddingBottom: 35,
  },

  header: {
    marginBottom: 18,
  },

  eyebrow: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    letterSpacing: 1.7,
    color: COLORS.caramel,
    marginBottom: 6,
  },

  title: {
    fontFamily:
      TYPOGRAPHY.screenTitle.fontFamily,
    fontSize:
      TYPOGRAPHY.screenTitle.fontSize,
    color: COLORS.text,
  },

  subtitle: {
    fontFamily:
      TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  locationBadge: {
    position: "absolute",
    right: 0,
    top: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.beige,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
  },

  locationText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.espresso,
  },

  searchBox: {
    height: 54,
    backgroundColor:
      COLORS.warmWhite,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 14,
    ...SHADOWS.card,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily:
      TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    color: COLORS.text,
  },

  filterList: {
    paddingRight: 10,
    paddingBottom: 18,
    gap: 8,
  },

  filterChip: {
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor:
      COLORS.warmWhite,
    paddingHorizontal: 13,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  filterChipSelected: {
    backgroundColor:
      COLORS.espresso,
    borderColor:
      COLORS.espresso,
  },

  filterText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.espresso,
  },

  filterTextSelected: {
    color: COLORS.white,
  },

  filterDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  filterPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },

  mapContainer: {
    height: 390,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 28,
    backgroundColor: COLORS.beige,
    ...SHADOWS.floating,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  marker: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor:
      COLORS.caramel,
    borderWidth: 3,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.floating,
  },

  markerSelected: {
    width: 47,
    height: 47,
    borderRadius: 24,
    backgroundColor:
      COLORS.espresso,
  },

  mapLabel: {
    position: "absolute",
    top: 13,
    left: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor:
      "rgba(255,252,247,0.95)",
    borderRadius: RADIUS.round,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  mapLabelText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.espresso,
  },

  mapPreview: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    minHeight: 104,
    backgroundColor:
      COLORS.warmWhite,
    borderRadius: 19,
    flexDirection: "row",
    padding: 9,
    ...SHADOWS.floating,
  },

  mapPreviewPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  previewImage: {
    width: 86,
    height: 86,
    borderRadius: 14,
  },

  previewContent: {
    flex: 1,
    paddingLeft: 11,
    paddingVertical: 2,
  },

  previewTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },

  previewName: {
    flex: 1,
    fontFamily:
      TYPOGRAPHY.cafeName.fontFamily,
    fontSize: 15,
    color: COLORS.text,
  },

  previewRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  previewRatingText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.text,
  },

  previewMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 9,
  },

  previewStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  statusText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
  },

  previewDistance: {
    fontFamily:
      TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  previewBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
  },

  previewPrep: {
    fontFamily:
      TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  previewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.beige,
    borderRadius: RADIUS.round,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  previewButtonText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    color: COLORS.espresso,
  },

  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  resultsTitle: {
    fontFamily:
      TYPOGRAPHY.sectionTitle.fontFamily,
    fontSize: 20,
    color: COLORS.text,
  },

  resultsSubtitle: {
    fontFamily:
      TYPOGRAPHY.caption.fontFamily,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  activeFilter: {
    backgroundColor: COLORS.beige,
    borderRadius: RADIUS.round,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  activeFilterText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    color: COLORS.espresso,
  },

  cafeCard: {
    backgroundColor:
      COLORS.warmWhite,
    borderRadius: RADIUS.xl,
    marginBottom: 14,
    overflow: "hidden",
    ...SHADOWS.card,
  },

  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  cafeImageContainer: {
    height: 185,
    position: "relative",
  },

  cafeImage: {
    width: "100%",
    height: "100%",
  },

  categoryBadge: {
    position: "absolute",
    left: 12,
    top: 12,
    backgroundColor:
      "rgba(255,252,247,0.94)",
    borderRadius: RADIUS.round,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  categoryBadgeText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    color: COLORS.espresso,
  },

  favoriteButton: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:
      "rgba(255,252,247,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },

  cafeInfo: {
    padding: 15,
  },

  cafeNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  cafeName: {
    flex: 1,
    fontFamily:
      TYPOGRAPHY.cafeName.fontFamily,
    fontSize: 17,
    color: COLORS.text,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 12,
    color: COLORS.text,
  },

  cafeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 5,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  metaText: {
    fontFamily:
      TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  separator: {
    color: COLORS.textMuted,
  },

  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.beige,
    borderRadius: RADIUS.round,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  viewButtonText: {
    fontFamily:
      TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.espresso,
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 25,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  emptyTitle: {
    fontFamily:
      TYPOGRAPHY.sectionTitle.fontFamily,
    fontSize: 19,
    color: COLORS.text,
  },

  emptyText: {
    fontFamily:
      TYPOGRAPHY.body.fontFamily,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 7,
  },
});