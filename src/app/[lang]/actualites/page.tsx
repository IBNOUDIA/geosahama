import NewsSection from "@/components/NewsSection";
import Testimonials from "@/components/Testimonials";
import { getDictionary } from "@/dictionaries/get-dictionary";

export default async function ActualitesPage({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <NewsSection dict={dict} />
      <Testimonials dict={dict} />
    </div>
  );
}
