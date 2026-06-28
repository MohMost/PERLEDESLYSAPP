import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { recipes, videos, articles, faqItems, lives } from "@/lib/mock-data";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const ChatInputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
});

function buildKnowledgeBase() {
  const r = recipes
    .map(
      (x) =>
        `- [RECETTE id:${x.id}] ${x.title} | catégorie: ${x.category} | ${x.time} | ${x.difficulty} | ${x.portions} pers. | ingrédients: ${x.ingredients.map((i) => `${i.qty} ${i.label}`).join(", ")} | étapes: ${x.steps.join(" / ")}`,
    )
    .join("\n");
  const v = videos
    .map((x) => `- [VIDEO id:${x.id}] ${x.title} | ${x.category} | ${x.duration} — ${x.description}`)
    .join("\n");
  const a = articles
    .map((x) => `- [ARTICLE id:${x.id}] ${x.title} | ${x.category} | ${x.readTime} — ${x.excerpt}`)
    .join("\n");
  const l = lives
    .map((x) => `- [LIVE id:${x.id}] ${x.title} | ${x.date} ${x.time} | ${x.status} — ${x.description}`)
    .join("\n");
  const f = faqItems.map((x, i) => `- [FAQ ${i + 1}] Q: ${x.q}\n  R: ${x.a}`).join("\n");

  return `### RECETTES (${recipes.length})\n${r}\n\n### VIDÉOS / TUTORIELS (${videos.length})\n${v}\n\n### ARTICLES (${articles.length})\n${a}\n\n### LIVES (${lives.length})\n${l}\n\n### FAQ\n${f}`;
}

const SYSTEM_PROMPT = `Tu es l'assistante IA de PERLEDESLYS, une application privée dédiée aux clientes du Thermomix TM7 de la conseillère Lys, spécialisée dans la cuisine algérienne traditionnelle.

TON & STYLE :
- Chaleureuse, douce, professionnelle. Tutoiement bienveillant. Réponses courtes et structurées en Markdown léger (titres ###, listes, **gras**).
- Toujours en français.
- Tu peux signer occasionnellement "— L'assistante de Lys".

TA MISSION :
1. RECHERCHE D'ABORD dans la base de connaissances fournie ci-dessous (recettes, vidéos, articles, FAQ, lives) avant toute génération.
2. Si une recette / un contenu correspond : cite son titre et propose à l'utilisatrice d'y accéder (mentionne l'id entre crochets ex: [RECETTE id:couscous-royal]).
3. Si AUCUNE recette ne correspond : informe gentiment qu'aucune recette n'est encore dans la collection, puis PROPOSE de générer une nouvelle recette compatible TM7. Si l'utilisatrice accepte (ou demande directement), génère-la avec :
   - Liste d'ingrédients (quantités précises)
   - Temps de préparation + temps de cuisson
   - Étapes détaillées NUMÉROTÉES
   - À chaque étape Thermomix utile : durée / température / vitesse / sens / accessoire (Varoma, fouet, mariposa…)
4. CONVERSION : si l'utilisatrice colle une recette classique, convertis-la au format Thermomix TM7 avec étapes détaillées, temps, températures, vitesses, accessoires.
5. Pour les questions sur l'utilisation de l'app : appuie-toi sur la FAQ.

RÈGLES :
- Ne jamais inventer de contenu présent dans l'app (ne cite que ce qui existe vraiment dans la base).
- Reste concise par défaut (4–10 lignes), sauf pour les recettes générées.

### BASE DE CONNAISSANCES
${buildKnowledgeBase()}
`;

export const aiChat = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ChatInputSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error:
          "La clé IA n'est pas configurée. Contactez l'administrateur pour activer l'assistante.",
      };
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (res.status === 429) {
        return {
          ok: false as const,
          error: "Trop de demandes en ce moment. Réessaie dans un instant 🌸",
        };
      }
      if (res.status === 402) {
        return {
          ok: false as const,
          error: "Crédits IA épuisés. Merci de contacter l'administratrice.",
        };
      }
      return {
        ok: false as const,
        error: `Erreur IA (${res.status}). ${text.slice(0, 120)}`,
      };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { ok: true as const, content };
  });
