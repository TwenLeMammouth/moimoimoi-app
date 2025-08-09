import MMMaskPixelArt from "@/components/MMMaskPixelArt";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center">
      <MMMaskPixelArt />
      <h1 className="text-4xl font-bold mb-4">MoiMoiMoi</h1>
      <p className="max-w-lg mb-6 text-muted-foreground">
        Ici on va parler de Toi, aussi un peu de Toi, mais surtout .. de Toi !
      </p>
      <Button asChild>
        <a href="/test">Commencer un test</a>
      </Button>
    </main>
  );
}