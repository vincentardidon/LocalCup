import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  Heart,
  MapPin,
  Plus,
  Share2,
  ShoppingBag,
  Star,
  Store,
  WalletCards,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  RADIUS,
  SHADOWS,
  TYPOGRAPHY
} from "../../constants/theme";

import { useLocalCup } from "../../context/LocalCupContext";

const CAFES = [
  {
    id: "1",
    name: "Hearth & Brew",
    rating: 4.8,
    reviews: 126,
    distance: 0.8,
    open: true,
    prepTime: "8-12 min",
    address: "42 Mango Avenue, Cebu City",
    description:
      "Independent neighborhood cafe serving handcrafted espresso drinks and fresh pastries.",
    hours: [
      ["Monday - Friday", "7:00 AM - 9:00 PM"],
      ["Saturday", "8:00 AM - 10:00 PM"],
      ["Sunday", "8:00 AM - 8:00 PM"],
    ],
    services: [
      "Dine-in",
      "Takeaway",
      "Order Ahead",
      "Free Wi-Fi",
    ],
    payments: [
      "Cash",
      "GCash",
      "Maya",
      "Credit / Debit",
    ],
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
    ],
    products: [
      {
        id: "1-1",
        name: "Spanish Latte",
        description: "Smooth espresso with creamy sweet milk.",
        price: 165,
        status: "Available",
        image:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
      },
      {
        id: "1-2",
        name: "Caramel Macchiato",
        description: "Espresso, steamed milk and caramel.",
        price: 175,
        status: "Available",
        image:
          "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600",
      },
      {
        id: "1-3",
        name: "Iced Americano",
        description: "Bold espresso served chilled over ice.",
        price: 130,
        status: "Low Stock",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
      },
      {
        id: "1-4",
        name: "Butter Croissant",
        description: "Flaky, buttery and freshly baked.",
        price: 120,
        status: "Sold Out",
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
      },
    ],
    reviewsList: [
      {
        name: "Mika D.",
        rating: 5,
        review:
          "Really cozy place and the Spanish latte was excellent. The staff were also very friendly.",
        date: "2 days ago",
      },
      {
        name: "Carlo R.",
        rating: 5,
        review:
          "One of my favorite places to work. Good coffee, nice atmosphere and fast service.",
        date: "1 week ago",
      },
      {
        name: "Andrea P.",
        rating: 4,
        review:
          "The pastries were fresh and the coffee was smooth. Definitely coming back.",
        date: "2 weeks ago",
      },
    ],
  },

  {
    id: "2",
    name: "Bean There Coffee",
    rating: 4.7,
    reviews: 98,
    distance: 1.2,
    open: true,
    prepTime: "10-15 min",
    address: "18 Gorordo Avenue, Cebu City",
    description:
      "Small-batch coffee roaster focused on carefully sourced beans and handcrafted drinks.",
    hours: [
      ["Monday - Friday", "7:00 AM - 8:00 PM"],
      ["Saturday", "8:00 AM - 9:00 PM"],
      ["Sunday", "8:00 AM - 8:00 PM"],
    ],
    services: [
      "Dine-in",
      "Takeaway",
      "Order Ahead",
      "Free Wi-Fi",
    ],
    payments: [
      "Cash",
      "GCash",
      "Maya",
      "Credit / Debit",
    ],
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    ],
    products: [
      {
        id: "2-1",
        name: "House Latte",
        description: "Rich espresso with silky steamed milk.",
        price: 155,
        status: "Available",
        image:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
      },
      {
        id: "2-2",
        name: "Cold Brew",
        description: "Slow-steeped coffee with a smooth finish.",
        price: 145,
        status: "Available",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
      },
      {
        id: "2-3",
        name: "Mocha",
        description: "Espresso blended with chocolate and milk.",
        price: 170,
        status: "Low Stock",
        image:
          "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600",
      },
    ],
    reviewsList: [
      {
        name: "Josh M.",
        rating: 5,
        review:
          "Great beans and the staff clearly know their coffee. Very relaxing place.",
        date: "3 days ago",
      },
      {
        name: "Nica L.",
        rating: 4,
        review:
          "Loved the cold brew. The place is quiet enough for studying too.",
        date: "5 days ago",
      },
    ],
  },
];

const FALLBACK_CAFE = CAFES[0];

export default function CafeDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { favorites, toggleFavorite, addToCart } =
    useLocalCup();

  const [addedProduct, setAddedProduct] = useState(null);

  const cafe = useMemo(() => {
    return (
      CAFES.find((item) => item.id === String(id)) ||
      FALLBACK_CAFE
    );
  }, [id]);

  const isFavorite = favorites.includes(cafe.id);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${cafe.name} on LocalCup. ${cafe.description}`,
      });
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  const handleAdd = (product) => {
    if (product.status === "Sold Out") {
      return;
    }

    addToCart({
      id: product.id,
      cafeId: cafe.id,
      cafeName: cafe.name,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1400);
  };

  const getStatusStyle = (status) => {
    if (status === "Low Stock") {
      return {
        backgroundColor: "#F3E4D3",
        color: COLORS.warning,
      };
    }

    if (status === "Sold Out") {
      return {
        backgroundColor: "#EDE8E4",
        color: COLORS.textMuted,
      };
    }

    return {
      backgroundColor: COLORS.sageLight,
      color: COLORS.success,
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO */}
        <View style={styles.hero}>
          <Image
            source={{ uri: cafe.image }}
            style={styles.heroImage}
          />

          <View style={styles.heroOverlay} />

          <View style={styles.headerButtons}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.headerButton,
                pressed && styles.pressed,
              ]}
            >
              <ArrowLeft
                size={21}
                color={COLORS.espresso}
              />
            </Pressable>

            <View style={styles.headerRight}>
              <Pressable
                onPress={() => toggleFavorite(cafe.id)}
                style={({ pressed }) => [
                  styles.headerButton,
                  pressed && styles.pressed,
                ]}
              >
                <Heart
                  size={20}
                  color={
                    isFavorite
                      ? COLORS.caramel
                      : COLORS.espresso
                  }
                  fill={
                    isFavorite
                      ? COLORS.caramel
                      : "transparent"
                  }
                />
              </Pressable>

              <Pressable
                onPress={handleShare}
                style={({ pressed }) => [
                  styles.headerButton,
                  pressed && styles.pressed,
                ]}
              >
                <Share2
                  size={20}
                  color={COLORS.espresso}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.heroBottom}>
            <View style={styles.heroTag}>
              <Coffee
                size={13}
                color={COLORS.espresso}
              />
              <Text style={styles.heroTagText}>
                LOCAL FAVORITE
              </Text>
            </View>
          </View>
        </View>

        {/* CAFE INFO */}
        <View style={styles.infoSection}>
          <View style={styles.nameRow}>
            <View style={styles.nameContainer}>
              <Text style={styles.cafeName}>
                {cafe.name}
              </Text>

              <View style={styles.ratingRow}>
                <Star
                  size={16}
                  color={COLORS.caramel}
                  fill={COLORS.caramel}
                />

                <Text style={styles.rating}>
                  {cafe.rating}
                </Text>

                <Text style={styles.reviewCount}>
                  ({cafe.reviews} reviews)
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.openBadge,
                {
                  backgroundColor: cafe.open
                    ? COLORS.sageLight
                    : "#F1E0DD",
                },
              ]}
            >
              <View
                style={[
                  styles.openDot,
                  {
                    backgroundColor: cafe.open
                      ? COLORS.success
                      : COLORS.danger,
                  },
                ]}
              />

              <Text
                style={[
                  styles.openText,
                  {
                    color: cafe.open
                      ? COLORS.success
                      : COLORS.danger,
                  },
                ]}
              >
                {cafe.open ? "Open" : "Closed"}
              </Text>
            </View>
          </View>

          <View style={styles.quickInfo}>
            <View style={styles.quickInfoItem}>
              <MapPin
                size={16}
                color={COLORS.caramel}
              />
              <Text style={styles.quickInfoText}>
                {cafe.distance} km
              </Text>
            </View>

            <View style={styles.quickDivider} />

            <View style={styles.quickInfoItem}>
              <Clock3
                size={16}
                color={COLORS.caramel}
              />
              <Text style={styles.quickInfoText}>
                {cafe.prepTime}
              </Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <MapPin
              size={17}
              color={COLORS.textSecondary}
            />

            <Text style={styles.address}>
              {cafe.address}
            </Text>
          </View>

          <Text style={styles.description}>
            {cafe.description}
          </Text>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionSection}>
          <Pressable
            onPress={() =>
              router.push(`/menu?cafeId=${cafe.id}`)
            }
            style={({ pressed }) => [
              styles.primaryAction,
              pressed && styles.pressed,
            ]}
          >
            <Coffee
              size={19}
              color={COLORS.warmWhite}
            />

            <Text style={styles.primaryActionText}>
              View Menu
            </Text>

            <ChevronRight
              size={18}
              color={COLORS.warmWhite}
            />
          </Pressable>

          <Pressable
            onPress={() =>
              router.push(`/menu?cafeId=${cafe.id}`)
            }
            style={({ pressed }) => [
              styles.secondaryAction,
              pressed && styles.pressed,
            ]}
          >
            <ShoppingBag
              size={19}
              color={COLORS.espresso}
            />

            <Text style={styles.secondaryActionText}>
              Order Ahead
            </Text>
          </Pressable>
        </View>

        {/* ABOUT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            About the cafe
          </Text>

          <Text style={styles.aboutText}>
            {cafe.description}
          </Text>

          <View style={styles.aboutCard}>
            <View style={styles.aboutHeading}>
              <Clock3
                size={19}
                color={COLORS.caramel}
              />

              <Text style={styles.aboutHeadingText}>
                Opening hours
              </Text>
            </View>

            {cafe.hours.map((hour) => (
              <View
                key={hour[0]}
                style={styles.hourRow}
              >
                <Text style={styles.dayText}>
                  {hour[0]}
                </Text>

                <Text style={styles.timeText}>
                  {hour[1]}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.aboutCard}>
            <View style={styles.aboutHeading}>
              <Store
                size={19}
                color={COLORS.caramel}
              />

              <Text style={styles.aboutHeadingText}>
                Available services
              </Text>
            </View>

            <View style={styles.chipContainer}>
              {cafe.services.map((service) => (
                <View
                  key={service}
                  style={styles.serviceChip}
                >
                  <Check
                    size={13}
                    color={COLORS.success}
                  />

                  <Text style={styles.serviceText}>
                    {service}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.aboutCard}>
            <View style={styles.aboutHeading}>
              <WalletCards
                size={19}
                color={COLORS.caramel}
              />

              <Text style={styles.aboutHeadingText}>
                Payment methods
              </Text>
            </View>

            <View style={styles.chipContainer}>
              {cafe.payments.map((payment) => (
                <View
                  key={payment}
                  style={styles.paymentChip}
                >
                  <Text style={styles.paymentText}>
                    {payment}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* FEATURED ITEMS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Featured drinks & bites
              </Text>

              <Text style={styles.sectionSubtitle}>
                Popular picks from this cafe
              </Text>
            </View>

            <Pressable
              onPress={() =>
                router.push(`/menu?cafeId=${cafe.id}`)
              }
            >
              <Text style={styles.seeAll}>
                See all
              </Text>
            </Pressable>
          </View>

          {cafe.products.map((product) => {
            const statusStyle = getStatusStyle(
              product.status
            );

            const isSoldOut =
              product.status === "Sold Out";

            const wasAdded =
              addedProduct === product.id;

            return (
              <View
                key={product.id}
                style={[
                  styles.productCard,
                  isSoldOut && styles.productSoldOut,
                ]}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />

                <View style={styles.productContent}>
                  <View style={styles.productTop}>
                    <Text
                      style={styles.productName}
                      numberOfLines={1}
                    >
                      {product.name}
                    </Text>

                    <Text style={styles.productPrice}>
                      ₱{product.price}
                    </Text>
                  </View>

                  <Text
                    style={styles.productDescription}
                    numberOfLines={2}
                  >
                    {product.description}
                  </Text>

                  <View style={styles.productBottom}>
                    <View
                      style={[
                        styles.stockBadge,
                        {
                          backgroundColor:
                            statusStyle.backgroundColor,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.stockText,
                          {
                            color: statusStyle.color,
                          },
                        ]}
                      >
                        {product.status}
                      </Text>
                    </View>

                    <Pressable
                      disabled={isSoldOut}
                      onPress={() => handleAdd(product)}
                      style={({ pressed }) => [
                        styles.addButton,
                        isSoldOut &&
                          styles.addButtonDisabled,
                        pressed &&
                          !isSoldOut &&
                          styles.addButtonPressed,
                      ]}
                    >
                      {wasAdded ? (
                        <Check
                          size={17}
                          color={COLORS.warmWhite}
                        />
                      ) : (
                        <Plus
                          size={18}
                          color={
                            isSoldOut
                              ? COLORS.textMuted
                              : COLORS.warmWhite
                          }
                        />
                      )}

                      <Text
                        style={[
                          styles.addButtonText,
                          isSoldOut &&
                            styles.addButtonTextDisabled,
                        ]}
                      >
                        {isSoldOut
                          ? "Sold Out"
                          : wasAdded
                          ? "Added"
                          : "Add"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* PHOTO GALLERY */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Inside {cafe.name}
              </Text>

              <Text style={styles.sectionSubtitle}>
                A little look around
              </Text>
            </View>
          </View>

          <View style={styles.gallery}>
            <Image
              source={{ uri: cafe.gallery[0] }}
              style={styles.galleryLarge}
            />

            <View style={styles.galleryRight}>
              <Image
                source={{ uri: cafe.gallery[1] }}
                style={styles.gallerySmall}
              />

              <Image
                source={{ uri: cafe.gallery[2] }}
                style={styles.gallerySmall}
              />
            </View>
          </View>

          <View style={styles.galleryBottom}>
            <Image
              source={{ uri: cafe.gallery[3] }}
              style={styles.galleryBottomImage}
            />

            <View style={styles.photoCount}>
              <Text style={styles.photoCountText}>
                +{cafe.gallery.length + 3} photos
              </Text>
            </View>
          </View>
        </View>

        {/* REVIEWS */}
        <View style={styles.section}>
          <View style={styles.reviewHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Customer reviews
              </Text>

              <View style={styles.overallRating}>
                <Star
                  size={18}
                  color={COLORS.caramel}
                  fill={COLORS.caramel}
                />

                <Text style={styles.overallRatingText}>
                  {cafe.rating}
                </Text>

                <Text style={styles.overallReviewText}>
                  from {cafe.reviews} reviews
                </Text>
              </View>
            </View>
          </View>

          {cafe.reviewsList.map((review) => (
            <View
              key={`${review.name}-${review.date}`}
              style={styles.reviewCard}
            >
              <View style={styles.reviewerRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {review.name.charAt(0)}
                  </Text>
                </View>

                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>
                    {review.name}
                  </Text>

                  <View style={styles.stars}>
                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={12}
                          color={COLORS.caramel}
                          fill={
                            index < review.rating
                              ? COLORS.caramel
                              : "transparent"
                          }
                        />
                      )
                    )}
                  </View>
                </View>

                <Text style={styles.reviewDate}>
                  {review.date}
                </Text>
              </View>

              <Text style={styles.reviewText}>
                {review.review}
              </Text>
            </View>
          ))}
        </View>

        {/* BOTTOM SPACE */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  hero: {
    height: 330,
    position: "relative",
    backgroundColor: COLORS.beige,
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(52, 35, 29, 0.12)",
  },

  headerButtons: {
    position: "absolute",
    top: 54,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerRight: {
    flexDirection: "row",
    gap: 9,
  },

  headerButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "rgba(255, 252, 247, 0.94)",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.card,
  },

  heroBottom: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },

  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.warmWhite,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
  },

  heroTagText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    letterSpacing: 0.8,
    color: COLORS.espresso,
  },

  infoSection: {
    backgroundColor: COLORS.warmWhite,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  nameContainer: {
    flex: 1,
    marginRight: 12,
  },

  cafeName: {
    fontFamily: TYPOGRAPHY.screenTitle.fontFamily,
    fontSize: 27,
    lineHeight: 34,
    color: COLORS.espresso,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 5,
  },

  rating: {
    fontFamily: TYPOGRAPHY.productName.fontFamily,
    fontSize: 14,
    color: COLORS.espresso,
  },

  reviewCount: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 12,
    color: COLORS.textMuted,
  },

  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.round,
  },

  openDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  openText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
  },

  quickInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    gap: 14,
  },

  quickInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  quickInfoText: {
    fontFamily: TYPOGRAPHY.bodyMedium.fontFamily,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  quickDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    marginTop: 17,
  },

  address: {
    flex: 1,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
  },

  description: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
    marginTop: 14,
  },

  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 10,
  },

  primaryAction: {
    minHeight: 54,
    backgroundColor: COLORS.espresso,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...SHADOWS.floating,
  },

  primaryActionText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 14,
    color: COLORS.warmWhite,
  },

  secondaryAction: {
    minHeight: 54,
    backgroundColor: COLORS.caramel,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  secondaryActionText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 14,
    color: COLORS.espresso,
  },

  section: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 14,
  },

  sectionTitle: {
    fontFamily: TYPOGRAPHY.sectionTitle.fontFamily,
    fontSize: 20,
    lineHeight: 27,
    color: COLORS.espresso,
  },

  sectionSubtitle: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  seeAll: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 12,
    color: COLORS.caramel,
  },

  aboutText: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 14,
  },

  aboutCard: {
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 10,
    ...SHADOWS.card,
  },

  aboutHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 13,
  },

  aboutHeadingText: {
    fontFamily: TYPOGRAPHY.productName.fontFamily,
    fontSize: 14,
    color: COLORS.espresso,
  },

  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  dayText: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  timeText: {
    fontFamily: TYPOGRAPHY.bodyMedium.fontFamily,
    fontSize: 12,
    color: COLORS.espresso,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  serviceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.sageLight,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.round,
  },

  serviceText: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.success,
  },

  paymentChip: {
    backgroundColor: COLORS.beige,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: RADIUS.round,
  },

  paymentText: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  productCard: {
    backgroundColor: COLORS.warmWhite,
    borderRadius: 18,
    padding: 10,
    marginBottom: 12,
    flexDirection: "row",
    ...SHADOWS.card,
  },

  productSoldOut: {
    opacity: 0.72,
  },

  productImage: {
    width: 105,
    height: 120,
    borderRadius: 14,
  },

  productContent: {
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 3,
  },

  productTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },

  productName: {
    flex: 1,
    fontFamily: TYPOGRAPHY.productName.fontFamily,
    fontSize: 15,
    color: COLORS.espresso,
  },

  productPrice: {
    fontFamily: TYPOGRAPHY.price.fontFamily,
    fontSize: 15,
    color: COLORS.caramel,
  },

  productDescription: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  productBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },

  stockBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
  },

  stockText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 9,
  },

  addButton: {
    height: 34,
    minWidth: 72,
    paddingHorizontal: 11,
    borderRadius: 10,
    backgroundColor: COLORS.espresso,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  addButtonDisabled: {
    backgroundColor: COLORS.beige,
  },

  addButtonPressed: {
    transform: [{ scale: 0.95 }],
  },

  addButtonText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    color: COLORS.warmWhite,
  },

  addButtonTextDisabled: {
    color: COLORS.textMuted,
  },

  gallery: {
    height: 270,
    flexDirection: "row",
    gap: 7,
  },

  galleryLarge: {
    flex: 1.35,
    height: "100%",
    borderRadius: 17,
  },

  galleryRight: {
    flex: 1,
    gap: 7,
  },

  gallerySmall: {
    flex: 1,
    width: "100%",
    borderRadius: 17,
  },

  galleryBottom: {
    height: 130,
    marginTop: 7,
    position: "relative",
  },

  galleryBottomImage: {
    width: "100%",
    height: "100%",
    borderRadius: 17,
  },

  photoCount: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(52, 35, 29, 0.82)",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: RADIUS.round,
  },

  photoCountText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    color: COLORS.warmWhite,
  },

  reviewHeader: {
    marginBottom: 12,
  },

  overallRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },

  overallRatingText: {
    fontFamily: TYPOGRAPHY.productName.fontFamily,
    fontSize: 14,
    color: COLORS.espresso,
  },

  overallReviewText: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textMuted,
  },

  reviewCard: {
    backgroundColor: COLORS.warmWhite,
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    ...SHADOWS.card,
  },

  reviewerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 13,
    color: COLORS.espresso,
  },

  reviewerInfo: {
    flex: 1,
    marginLeft: 9,
  },

  reviewerName: {
    fontFamily: TYPOGRAPHY.bodyMedium.fontFamily,
    fontSize: 12,
    color: COLORS.espresso,
  },

  stars: {
    flexDirection: "row",
    gap: 2,
    marginTop: 3,
  },

  reviewDate: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 10,
    color: COLORS.textMuted,
  },

  reviewText: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.textSecondary,
    marginTop: 13,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  bottomSpace: {
    height: 30,
  },
});