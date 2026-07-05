import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { recipes, videos, lives, articles } from '@/lib/perle-data';
import { ArticleCard, LiveCard, RecipeCard, Section, VideoCard } from '@/components/perle/PerleUI';
import { Spacing } from '@/constants/theme';
export default function ContentScreen(){return <Screen scroll contentContainerStyle={styles.content}><Text variant="hero">Explorer</Text><Text>Recettes algériennes, tutoriels TM7, lives privés et conseils de Lys.</Text><Section title="Recettes">{recipes.map(r=><RecipeCard key={r.id} recipe={r}/>)}</Section><Section title="Tutoriels"><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:12}}>{videos.map(v=><VideoCard key={v.id} video={v}/>)}</ScrollView></Section><Section title="Lives">{lives.map(l=><LiveCard key={l.id} live={l}/>)}</Section><Section title="Articles & astuces">{articles.map(a=><ArticleCard key={a.id} article={a}/>)}</Section></Screen>}
const styles=StyleSheet.create({content:{gap:Spacing.five,paddingBottom:110}});
