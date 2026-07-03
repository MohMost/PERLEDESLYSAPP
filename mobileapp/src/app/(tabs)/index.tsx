import { Link } from 'expo-router';
import { ImageBackground, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { articles, lives, recipes, user, videos, welcomeMessage } from '@/lib/perle-data';

function Section({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return <View className="mt-7 gap-3"><View className="flex-row items-center justify-between px-5"><Text className="text-3xl font-semibold text-stone-900">{title}</Text>{href ? <Link href={href as never} asChild><Pressable><Text className="text-xs font-bold uppercase tracking-widest text-amber-600">Tout voir ›</Text></Pressable></Link> : null}</View>{children}</View>;
}

function Hero({ image, height = 150, children }: { image: unknown; height?: number; children: React.ReactNode }) {
  return <ImageBackground source={image as never} resizeMode="cover" className="overflow-hidden rounded-3xl" style={{ height }} imageStyle={{ borderRadius: 28 }}><View className="flex-1 bg-black/35 p-4">{children}</View></ImageBackground>;
}

export default function HomeScreen() {
  const continueWatching = videos.filter((video) => video.progress).slice(0, 3);
  const newRecipes = recipes.filter((recipe) => recipe.isNew);
  const nextLive = lives.find((live) => live.status === 'À venir') ?? lives[0];
  const featured = recipes[0];

  return <SafeAreaView className="flex-1 bg-[#fbf8f5]">
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
      <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
        <View className="flex-row items-center gap-3"><ImageBackground source={user.avatar as never} className="h-11 w-11 overflow-hidden rounded-full border-2 border-rose-200" imageStyle={{ borderRadius: 22 }} /><View><Text className="text-[10px] uppercase tracking-[2px] text-stone-500">Marhba</Text><Text className="text-lg font-semibold leading-tight text-stone-900">{user.firstName}</Text></View></View>
        <Pressable className="relative h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white"><Text>🔔</Text><View className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-rose-400" /></Pressable>
      </View>

      <View className="mt-4 px-5"><Link href="/(tabs)/content" asChild><Pressable className="rounded-2xl border border-rose-100 bg-white py-3.5 pl-4 pr-4"><Text className="text-sm text-stone-500">🔎  Rechercher une recette, un tutoriel TM7…</Text></Pressable></Link></View>

      <Link href="/(tabs)/content" asChild><Pressable className="mx-5 mt-5 overflow-hidden rounded-3xl shadow-lg"><Hero image={nextLive.image} height={132}><View className="flex-1 justify-between"><View className="self-start rounded-full bg-white/95 px-2.5 py-1"><Text className="text-[10px] font-bold uppercase tracking-wider text-stone-900">🔴 Prochain live</Text></View><View><Text className="text-[11px] uppercase tracking-wider text-white">{nextLive.date} · {nextLive.time}</Text><Text className="mt-0.5 text-base font-semibold leading-tight text-white">{nextLive.title}</Text></View></View></Hero></Pressable></Link>

      <Section title="Mes premiers pas"><View className="px-5"><Hero image={featured.image} height={150}><View className="flex-1 flex-row items-center gap-4"><View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/20"><Text className="text-3xl text-white">🧭</Text></View><View className="flex-1"><Text className="text-[10px] uppercase tracking-[2.5px] text-white">Pour bien démarrer</Text><Text className="mt-0.5 text-xl font-semibold leading-tight text-white">Mes premiers pas avec le TM7</Text><Text className="mt-1 text-[11px] text-white">▶ Vidéo 35 min · Mot de Lys inclus</Text></View><Text className="text-xl text-white">›</Text></View></Hero></View></Section>

      <Section title="Recette signature" href="/(tabs)/content"><View className="px-5"><Hero image={featured.image} height={220}><View className="flex-1 justify-end">{featured.isNew ? <View className="absolute left-0 top-0 rounded-full bg-amber-300 px-2.5 py-1"><Text className="text-[10px] font-bold uppercase tracking-wider text-stone-900">✨ Nouveau</Text></View> : null}<Text className="text-[10px] uppercase tracking-[2.5px] text-white">{featured.category}</Text><Text className="mt-0.5 text-2xl font-semibold leading-tight text-white">{featured.title}</Text><View className="mt-2 flex-row items-center gap-3"><Text className="text-[11px] text-white">⏱ {featured.time}</Text><Text className="text-[11px] text-white">🔥 {featured.difficulty}</Text><View className="ml-auto rounded-full bg-white/95 px-2 py-0.5"><Text className="text-[11px] text-stone-900">↗ Cookidoo</Text></View></View></View></Hero></View></Section>

      {continueWatching.length ? <Section title="Reprendre la formation" href="/(tabs)/content"><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 px-5">{continueWatching.map((video) => <View key={video.id} className="w-64"><Hero image={video.image} height={145}><View className="absolute inset-0 items-center justify-center"><View className="h-12 w-12 items-center justify-center rounded-full bg-white/95"><Text className="text-rose-500">▶</Text></View></View><View className="flex-1 justify-end"><Text className="text-[10px] font-semibold uppercase tracking-[2px] text-rose-100">{video.category}</Text><Text className="mt-0.5 text-sm font-semibold leading-snug text-white">{video.title}</Text></View></Hero><View className="h-1 rounded-b bg-rose-100"><View className="h-1 bg-rose-400" style={{ width: `${video.progress ?? 0}%` }} /></View></View>)}</ScrollView></Section> : null}

      <Section title="Nouveautés de la semaine" href="/(tabs)/content"><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 px-5">{newRecipes.map((recipe) => <View key={recipe.id} className="w-44"><Hero image={recipe.image} height={180}><View className="flex-1 justify-end"><Text className="text-[10px] uppercase tracking-widest text-white">{recipe.category}</Text><Text className="text-sm font-semibold text-white">{recipe.title}</Text></View></Hero></View>)}</ScrollView></Section>

      <Section title="Mot de Lys"><View className="mx-5 gap-2 rounded-3xl border border-rose-100 bg-white p-4"><Text className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Bienvenue · 2 min</Text><Text className="text-xl font-bold text-stone-900">{welcomeMessage.subject}</Text><Text className="text-sm text-stone-600">{welcomeMessage.body.slice(0, 150)}…</Text></View></Section>
      <Section title="Conseils"><View className="mx-5 gap-2 rounded-3xl border border-rose-100 bg-white p-4"><Text className="text-[10px] font-bold uppercase tracking-widest text-amber-600">{articles[0].category} · {articles[0].readTime}</Text><Text className="text-xl font-bold text-stone-900">{articles[0].title}</Text><Text className="text-sm text-stone-600">{articles[0].excerpt}</Text></View></Section>
    </ScrollView>
  </SafeAreaView>;
}
