import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { recipes, videos, articles, lives, user, welcomeMessage } from '@/lib/perle-data';
import { ArticleCard, HeroImage, Horizontal, LiveCard, RecipeCard, Section, VideoCard, perle } from '@/components/perle/PerleUI';
import { Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const nextLive = lives.find((live) => live.status === 'À venir') ?? lives[0];
  return <Screen scroll contentContainerStyle={styles.content}>
    <View style={styles.header}><View><Text variant="label" style={styles.muted}>MARHBA</Text><Text variant="title">{user.firstName}</Text></View><Text style={styles.bell}>🔔</Text></View>
    <Link href="/(tabs)/content" asChild><Pressable style={styles.search}><Text style={styles.muted}>🔎 Rechercher une recette, un tutoriel TM7…</Text></Pressable></Link>
    <Link href="/(tabs)/content" asChild><Pressable><HeroImage image={nextLive.image} height={140}><View style={{flex:1,justifyContent:'space-between'}}><Text style={styles.livePill}>🔴 Prochain live</Text><View><Text variant="label" style={styles.white}>{nextLive.date} · {nextLive.time}</Text><Text variant="subtitle" style={styles.white}>{nextLive.title}</Text></View></View></HeroImage></Pressable></Link>
    <Section title="Mes premiers pas"><HeroImage image={recipes[0].image} height={150}><Text variant="label" style={styles.white}>POUR BIEN DÉMARRER</Text><Text variant="title" style={styles.white}>Mes premiers pas avec le TM7</Text><Text style={styles.white}>▶ Vidéo 35 min · Mot de Lys inclus</Text></HeroImage></Section>
    <Section title="Recette signature" href="/(tabs)/content"><RecipeCard recipe={recipes[0]} /></Section>
    <Section title="Reprendre la formation"><Horizontal>{videos.filter(v=>v.progress).map(v => <VideoCard key={v.id} video={v} />)}</Horizontal></Section>
    <Section title="Nouvelles recettes"><Horizontal>{recipes.filter(r=>r.isNew).map(r => <View key={r.id} style={{width:260}}><RecipeCard recipe={r} /></View>)}</Horizontal></Section>
    <Section title="Mot de Lys"><ArticleCard article={{id:'welcome', title: welcomeMessage.subject, excerpt: welcomeMessage.body.slice(0,150)+'…', image: recipes[0].image, readTime:'2 min', category:'Bienvenue'}} /></Section>
    <Section title="Conseils"><ArticleCard article={articles[0]} /></Section>
  </Screen>;
}
const styles = StyleSheet.create({ content:{gap:Spacing.five,paddingBottom:110}, header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}, muted:{color:perle.textSecondary}, bell:{fontSize:24,backgroundColor:perle.card,borderRadius:20,padding:10}, search:{backgroundColor:perle.card,borderColor:perle.border,borderWidth:1,borderRadius:22,padding:16}, white:{color:'#fff'}, livePill:{alignSelf:'flex-start',backgroundColor:'rgba(255,255,255,.92)',borderRadius:99,paddingHorizontal:10,paddingVertical:5,color:perle.text,fontSize:11} });
