<script lang="ts">
    import { page } from "$app/state";
    import favicon from "$lib/assets/logo.png";
    import { AppConfig, type Redirect, type Social } from "$lib/config";

    let { children, data }: { data: any; children: any } = $props();

    let domainSplit = page.url.hostname.split(".");
    let tld = domainSplit[domainSplit.length - 1];
    let social: Redirect | Social | null = page.params.social
        ? AppConfig.socials.find(
              (s) => s.id === page.params.social?.toLowerCase(),
          ) ||
          AppConfig.redirects.find(
              (r) => r.id === page.params.social?.toLowerCase(),
          ) ||
          null
        : null;
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Coduh</title>
    <meta property="og:site_name" content="coduh.{tld}" />
    <meta
        property="og:title"
        content="coduh{!social ? "'s Links" : ` | ${social.id}`}"
    />
    <meta property="og:type" content="website" />
    <meta
        property="og:url"
        content="{page.url.protocol}://{page.url.hostname}"
    />
    <meta
        property="og:description"
        content="{data?.user?.description
            ? data.user.description
            : 'hey big head'}{data.stream
            ? `\n\n🔴 LIVE PLAYING ${data.stream.game_name.toUpperCase()} NOW!`
            : ''}"
    />
    <meta
        property="og:image"
        content={data.stream && data.stream?.thumbnail_url
            ? data.stream.thumbnail_url
                  .replace("{width}", "1280")
                  .replace("{height}", "720")
            : favicon}
    />
    <meta name="theme-color" content="#256f81" />
    {#if data.stream && data.stream?.thumbnail_url}
        <meta name="twitter:card" content="summary_large_image" />
    {/if}
</svelte:head>

{@render children()}

<style>
    :global(body) {
        height: 100vh;
        width: 100%;
        font-family: "Do Hyeon", sans-serif;
        background: linear-gradient(195deg, #2d778b 12.17%, #153d46 93.37%);
    }
</style>
