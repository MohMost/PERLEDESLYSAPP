import { Text } from "@/components/ui/Text";
import { Colors, Radius, Spacing } from "@/constants/theme";
import type { Article, Live, Recipe, Video } from "@/lib/perle-data";
import { Link } from "expo-router";
import type { ReactNode } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
export const perle = Colors.light;
export function Section({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="title">{title}</Text>
        {href ? (
          <Link href={href as never} asChild>
            <Pressable>
              <Text variant="label" style={styles.gold}>
                Tout voir ›
              </Text>
            </Pressable>
          </Link>
        ) : null}
      </View>
      {children}
    </View>
  );
}
export function HeroImage({
  image,
  children,
  height = 220,
}: {
  image: any;
  children: ReactNode;
  height?: number;
}) {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={[styles.heroImage, { height }]}
      imageStyle={styles.heroRadius}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}
export function Pill({ children }: { children: ReactNode }) {
  return (
    <View style={styles.pill}>
      <Text variant="caption">{children}</Text>
    </View>
  );
}
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={{
        pathname: "/(protected)/recipes/[id]",
        params: { id: recipe.id },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        <HeroImage image={recipe.image} height={170}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text variant="label" style={styles.white}>
              {recipe.category}
            </Text>
            <Text variant="subtitle" style={styles.white}>
              {recipe.title}
            </Text>
            <View style={styles.meta}>
              <Text style={styles.whiteSmall}>⏱ {recipe.time}</Text>
              <Text style={styles.whiteSmall}>🔥 {recipe.difficulty}</Text>
            </View>
          </View>
        </HeroImage>
      </Pressable>
    </Link>
  );
}
export function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={{ pathname: "/(protected)/videos/[id]", params: { id: video.id } }}
      asChild
    >
      <Pressable style={[styles.card, { width: 260 }]}>
        <HeroImage image={video.image} height={145}>
          <View style={styles.play}>
            <Text>▶</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text variant="label" style={styles.white}>
              {video.category}
            </Text>
            <Text style={styles.white}>{video.title}</Text>
          </View>
        </HeroImage>
        {video.progress ? (
          <View style={styles.progress}>
            <View
              style={[styles.progressFill, { width: `${video.progress}%` }]}
            />
          </View>
        ) : null}
      </Pressable>
    </Link>
  );
}
export function LiveCard({ live }: { live: Live }) {
  return (
    <View style={styles.card}>
      <HeroImage image={live.image} height={180}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Pill>{live.status}</Pill>
          <View>
            <Text variant="label" style={styles.white}>
              {live.date} · {live.time}
            </Text>
            <Text variant="subtitle" style={styles.white}>
              {live.title}
            </Text>
            <Text style={styles.white}>{live.description}</Text>
          </View>
        </View>
      </HeroImage>
    </View>
  );
}
export function ArticleCard({ article }: { article: Article }) {
  return (
    <View style={styles.simpleCard}>
      <Text variant="label" style={styles.gold}>
        {article.category} · {article.readTime}
      </Text>
      <Text variant="subtitle">{article.title}</Text>
      <Text>{article.excerpt}</Text>
    </View>
  );
}
export function Horizontal({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: Spacing.three, paddingRight: Spacing.four }}
    >
      {children}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  section: { gap: Spacing.three },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gold: { color: perle.accent },
  white: { color: "#fff" },
  whiteSmall: { color: "#fff", fontSize: 12 },
  heroImage: { overflow: "hidden" },
  heroRadius: { borderRadius: 28 },
  overlay: {
    flex: 1,
    padding: Spacing.four,
    backgroundColor: "rgba(46,37,40,0.34)",
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,.9)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
  },
  card: { borderRadius: 28, overflow: "hidden", backgroundColor: perle.card },
  meta: { flexDirection: "row", gap: 12, marginTop: 8 },
  play: {
    position: "absolute",
    alignSelf: "center",
    top: "35%",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  progress: { height: 4, backgroundColor: "#ead8dc" },
  progressFill: { height: 4, backgroundColor: perle.primary },
  simpleCard: {
    backgroundColor: perle.card,
    borderColor: perle.border,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.four,
    gap: Spacing.two,
  },
});
