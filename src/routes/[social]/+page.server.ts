import { AppConfig } from "$lib/config";

export const load = async ({ params }) => {
  let social =
    AppConfig.socials.find((s) => s.id === params.social.toLowerCase()) ||
    AppConfig.redirects.find((r) => r.id === params.social.toLowerCase());

  return { social: social || null };
};
