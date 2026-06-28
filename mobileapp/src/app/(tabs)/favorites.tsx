import { StyleSheet } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { recipes } from '@/lib/perle-data';
import { RecipeCard, Section } from '@/components/perle/PerleUI';
import { Spacing } from '@/constants/theme';
export default function FavoritesScreen(){const favs=recipes.filter(r=>r.isNew);return <Screen scroll contentContainerStyle={styles.content}><Text variant="hero">Favoris</Text><Text>Retrouvez vos recettes et vidéos enregistrées.</Text><Section title={favs.length?'Vos favoris':'Aucun favori'}>{favs.map(r=><RecipeCard key={r.id} recipe={r}/>)}</Section></Screen>}
const styles=StyleSheet.create({content:{gap:Spacing.five,paddingBottom:110}});
