import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Features/>
      <Stats />
    </div>
  );
}
