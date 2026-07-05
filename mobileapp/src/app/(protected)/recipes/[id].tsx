import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { recipes } from '@/lib/perle-data';
import { HeroImage, Pill, perle } from '@/components/perle/PerleUI';
import { Spacing } from '@/constants/theme';
export default function RecipeDetail(){const {id}=useLocalSearchParams<{id:string}>();const recipe=recipes.find(r=>r.id===id)??recipes[0];return <Screen scroll contentContainerStyle={styles.content}><HeroImage image={recipe.image} height={300}><View style={{flex:1,justifyContent:'flex-end'}}>{recipe.isNew?<Pill>✨ Nouveau</Pill>:null}<Text variant="hero" style={styles.white}>{recipe.title}</Text><Text style={styles.white}>⏱ {recipe.time} · 🔥 {recipe.difficulty} · 👥 {recipe.portions}</Text></View></HeroImage><Text>{recipe.description}</Text><View style={styles.cookidoo}><Text variant="subtitle">Lien Cookidoo</Text><Text>{recipe.cookidooUrl}</Text></View><Text variant="title">Ingrédients</Text>{recipe.ingredients.map(i=><View key={i.label} style={styles.row}><Text>{i.label}</Text><Text variant="label">{i.qty}</Text></View>)}<Text variant="title">Étapes</Text>{recipe.steps.map((s,i)=><View key={s} style={styles.step}><Text variant="subtitle">{i+1}</Text><Text style={{flex:1}}>{s}</Text></View>)}</Screen>}
const styles=StyleSheet.create({content:{gap:Spacing.four,paddingBottom:40},white:{color:'#fff'},cookidoo:{backgroundColor:perle.card,borderColor:perle.border,borderWidth:1,borderRadius:24,padding:16},row:{flexDirection:'row',justifyContent:'space-between',backgroundColor:perle.card,borderRadius:14,padding:12},step:{flexDirection:'row',gap:12,backgroundColor:perle.card,borderRadius:18,padding:14}})
