import { notFound } from "next/navigation";

// Any unknown path under /fr or /en renders the site's own 404 page (with the
// navbar and footer) instead of Next's bare default.
export default function CatchAll() {
  notFound();
}
