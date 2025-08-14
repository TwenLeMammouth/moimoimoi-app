"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Brain, ShieldCheck, Sparkles, HeartHandshake, Clock, Lock, Compass } from "lucide-react";
import DoubleCurveDivider from "@/components/DoubleCurveDivider";
import MMMask from "@/components/MMMask";
import Logo from "@/components/Logo";

// --- Placeholder for the future MMMask .riv embed ---------------------------------------------
function MMMaskSpot() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[640px] aspect-[4/3] rounded-[28px] border-2 border-dashed border-muted-foreground/30 grid place-items-center bg-gradient-to-br from-[oklch(93%_0.12_240)] via-[oklch(96%_0.06_290)] to-[oklch(93%_0.12_180)] shadow-2xl"
    >
      <MMMask colorHex="#59DE65" />
    </motion.div>
  );
}
// ------------------------------------------------------------------------------------------------

export default function Home() {
  const nav = useMemo(
    () => [
      { href: "#features", label: "Fonctionnalités" },
      { href: "#how", label: "Comment ça marche" },
      { href: "#pricing", label: "Tarifs" },
      { href: "#faq", label: "FAQ" },
    ],
    []
  );

  // Mini sélecteur de palette fun
  const palettes = [
    { name: "Aqua", from: "from-[oklch(78%_0.18_210)]", to: "to-[oklch(74%_0.18_270)]" },
    { name: "Sunrise", from: "from-[oklch(82%_0.20_30)]", to: "to-[oklch(78%_0.17_80)]" },
    { name: "Candy", from: "from-[oklch(78%_0.23_340)]", to: "to-[oklch(76%_0.20_300)]" },
    { name: "Mint", from: "from-[oklch(86%_0.15_150)]", to: "to-[oklch(80%_0.15_200)]" },
  ] as const;
  const [scheme, setScheme] = useState(0);

  const gradientFrom = palettes[scheme].from;
  const gradientTo = palettes[scheme].to;

  const classToColor = (cls: string) =>
  cls.match(/\[(.+)\]/)?.[1]?.replaceAll("_", " ") ?? "oklch(78% 0.18 210)";

  const fromColor = classToColor(gradientFrom);
  const toColor   = classToColor(gradientTo);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated playful background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* big soft blobs */}
        <motion.div
          className={`absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full blur-3xl opacity-50 ${gradientFrom} ${gradientTo} bg-gradient-to-tr`}
          animate={{ y: [0, 12, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute top-1/3 -right-10 h-[280px] w-[280px] rounded-full blur-3xl opacity-40 ${gradientFrom} ${gradientTo} bg-gradient-to-br`}
          animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-[-80px] left-1/2 -translate-x-1/2 h-[380px] w-[380px] rounded-full blur-3xl opacity-40 ${gradientFrom} ${gradientTo} bg-gradient-to-tl`}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 100 100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100' height='100' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-sm`}></Logo>
            <span className="font-semibold tracking-tight">MoiMoiMoi</span>
            <Badge variant="secondary" className="ml-2">Beta</Badge>
          </Link>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 pr-2">
              {palettes.map((p, i) => (
                <button
                  key={p.name}
                  aria-label={`Palette ${p.name}`}
                  onClick={() => setScheme(i)}
                  className={`h-6 w-6 rounded-full border shadow-sm bg-gradient-to-r ${p.from} ${p.to} ${i===scheme ? "ring-2 ring-primary/40" : ""}`}
                />
              ))}
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button asChild className={`rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:opacity-90`}>
              <Link href="/tests">Commencer un test</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-8 md:pt-20 md:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          >
            L’app d’introspection {" "}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>douce et fun</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 text-lg text-muted-foreground max-w-prose"
          >
            Des tests sérieux, des couleurs qui sourient, et une analyse IA qui parle vraiment de <em>vous</em>. Comprenez vos forces, vos besoins et vos pistes de progrès — sans jugement, sans bla-bla inutile.
          </motion.p>

          {/* Stickers mood */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge className="rounded-xl bg-white text-foreground border shadow-sm">🌿 Doux</Badge>
            <Badge className="rounded-xl bg-white text-foreground border shadow-sm">🎯 Clair</Badge>
            <Badge className="rounded-xl bg-white text-foreground border shadow-sm">🧩 Ludique</Badge>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className={`rounded-2xl shadow-md bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:opacity-90`}>
              <Link href="/tests">Commencer gratuitement</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-2xl">
              <Link href="#features">Découvrir les fonctionnalités</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <span>Confidentialité par défaut • Vous gardez le contrôle de vos données</span>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <MMMaskSpot />
        </div>
      </section>

      {/* Cleaner divider (soft curve + gradient hairline) */}
      <DoubleCurveDivider
        fill="oklch(96% 0.06 290)"
        from={fromColor}
        to={toColor}
        className="w-full"
        height={160}
      />

      {/* Social proof / micro-copy */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-3xl border bg-card text-card-foreground p-4 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm"><strong>Analyses par facette</strong> pour un retour nuancé et utile</p>
          </div>
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5" />
            <p className="text-sm">Synthèses <strong>claires et actionnables</strong> (pas du charabia)</p>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5" />
            <p className="text-sm"><strong>Vie privée</strong> respectée, pas de revente de données</p>
          </div>
        </div>
      </section>

      {/* Features with gradient borders + bouncy hover */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {[{
            icon: <Sparkles className="h-5 w-5"/>,
            title: "Tests sérieux, ton léger",
            desc: "Des questionnaires de référence, mais sans jargon ni posture. Vous répondez comme vous parlez.",
            items: [
              "Formats courts ou approfondis selon votre temps",
              "Explications pédagogiques au fil du test",
              "Interface douce, accessible, sans distractions",
            ],
          },{
            icon: <Brain className="h-5 w-5"/>,
            title: "Analyse IA par facette",
            desc: "Chaque facette est analysée séparément pour un portrait qui vous ressemble vraiment.",
            items: [
              "Résultats progressifs pendant le test",
              "Conseils personnalisés, concrets et bienveillants",
              "Pas de case toute faite : nuances et contextes",
            ],
          },{
            icon: <ShieldCheck className="h-5 w-5"/>,
            title: "Sécurité & confidentialité",
            desc: "Vos données restent les vôtres. Point.",
            items: [
              "Compte protégé, contrôle d’accès par défaut",
              "Export et suppression en un clic",
              "Pas de revente ni publicité invasive",
            ],
          },{
            icon: <HeartHandshake className="h-5 w-5"/>,
            title: "Pour soi, et pour les pros",
            desc: "Un mode accompagné pour coachs, psys, éducateurs (bientôt).",
            items: [
              "Cartes de synthèse partageables",
              "Accès en marque blanche (prochainement)",
              "Parcours guidés pour ateliers et suivis",
            ],
          }].map((f, idx) => (
            <div key={idx} className={`group rounded-2xl p-[1px] bg-gradient-to-r ${gradientFrom} ${gradientTo} shadow-md`}> 
              <Card className="rounded-2xl transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">{f.icon} {f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-2">
                    {f.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* How it works with hover */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Comment ça marche</h2>
          <p className="text-muted-foreground mt-2">Un parcours simple, des résultats utiles.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Compass className="h-5 w-5"/> 1. Choisissez un test</CardTitle>
              <CardDescription>De l’auto-découverte rapide aux bilans approfondis.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <Button asChild variant="secondary" className="rounded-xl">
                <Link href="/tests">Voir la liste</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5"/> 2. Répondez à votre rythme</CardTitle>
              <CardDescription>Une question à la fois. Sans pression. Interface apaisée.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Conseils contextuels et micro‑aides pendant le test.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5"/> 3. Recevez votre profil</CardTitle>
              <CardDescription>Analyses par facette, pistes concrètes, et plan doux d’évolution.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <Button asChild className={`rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:opacity-90`}>
                <Link href="/tests">Commencer maintenant</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing teaser with hover */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tarifs simples</h2>
          <p className="text-muted-foreground mt-2">Commencez gratuitement. Débloquez les analyses complètes quand vous voulez.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Découverte</CardTitle>
              <CardDescription>Gratuit</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Tests courts essentiels</li>
                <li>Résultats de base</li>
                <li>Accès à vie à vos données</li>
              </ul>
              <Button asChild className={`mt-4 rounded-xl w-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:opacity-90`}>
                <Link href="/tests">Essayer</Link>
              </Button>
            </CardContent>
          </Card>

          <div className={`group rounded-2xl p-[1px] bg-gradient-to-r ${gradientFrom} ${gradientTo} shadow-md`}>
            <Card className="rounded-2xl transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analyses à la carte</CardTitle>
                  <Badge variant="outline">Populaire</Badge>
                </div>
                <CardDescription>Débloquez une analyse IA complète sur un test.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Conseils personnalisés détaillés</li>
                  <li>Analyses par facette</li>
                  <li>Carte de synthèse partageable</li>
                </ul>
                <Button asChild className={`mt-4 rounded-xl w-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:opacity-90`}>
                  <Link href="/products">Voir les options</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Abonnement</CardTitle>
              <CardDescription>Pour les curieux réguliers et les parcours guidés.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Accès étendu aux tests</li>
                <li>Suivi dans le temps</li>
                <li>Priorité sur les nouveautés</li>
              </ul>
              <Button asChild variant="secondary" className="mt-4 rounded-xl w-full">
                <Link href="/products">En savoir plus</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Questions fréquentes</h2>
          <p className="text-muted-foreground mt-2">Transparence et simplicité d’abord.</p>
        </div>
        <div className="space-y-4">
          <details className="group rounded-2xl border p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-medium">Mes données sont-elles vraiment privées ?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">Oui. Vous contrôlez ce que vous partagez. Export et suppression sont disponibles. Aucune revente ni publicité ciblée.</p>
          </details>
          <details className="group rounded-2xl border p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-medium">Les résultats sont-ils validés scientifiquement ?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">Nous nous appuyons sur des questionnaires reconnus et des synthèses IA transparentes (sources indiquées). Les résultats restent des aides à la réflexion, pas des diagnostics.</p>
          </details>
          <details className="group rounded-2xl border p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-medium">Puis-je essayer gratuitement ?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">Oui. Commencez par des tests courts gratuits. Les analyses complètes sont disponibles à la carte ou par abonnement.</p>
          </details>
          <details className="group rounded-2xl border p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-medium">Et pour les professionnels ?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">Un mode Pro arrive : accès guidé, cartes de synthèse partageables, et marque blanche.</p>
          </details>
        </div>

        {/* Email capture (optionnel) */}
        <Card className="mt-10 rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Rester informé</CardTitle>
            <CardDescription>Recevez les nouveautés (tests, fonctionnalités, offres) — pas de spam.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="#" className="flex flex-col sm:flex-row gap-3">
              <Input type="email" placeholder="Votre email" className="rounded-xl" />
              <Button type="submit" className={`rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:opacity-90`}>S’inscrire</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className={`rounded-2xl border p-6 md:p-10 shadow-md text-center bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white`}>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Prêt à mieux vous comprendre ?</h3>
          <p className="opacity-90 mt-2">Lancez un premier test gratuit et recevez des retours utiles dès aujourd’hui.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild size="lg" className="rounded-2xl bg-white text-foreground hover:opacity-100 hover:bg-white/30 hover:text-white">
              <Link href="/tests">Commencer un test</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-2xl bg-white/20 text-white hover:bg-white/30">
              <Link href="/products">Voir les offres</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} MoiMoiMoi — Tous droits réservés.</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground">Confidentialité</Link>
            <Link href="#" className="hover:text-foreground">Conditions</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
