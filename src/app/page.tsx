import { redirect } from "next/navigation";

const SLUG_PADRAO = "fsw-donalds";

export default function Home() {
  redirect(`/${SLUG_PADRAO}`);
}
