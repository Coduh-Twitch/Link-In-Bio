import { AppConfig } from "$lib/config";
import { redirect } from "@sveltejs/kit";

export const load = async ({ params }) => {
  let social =
    AppConfig.socials.find((s) => s.id === params.social.toLowerCase()) ||
    AppConfig.redirects.find((r) => r.id === params.social.toLowerCase());

  if(social) return redirect(302, social?.url)
};
