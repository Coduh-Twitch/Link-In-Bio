<script lang="ts">
    import { Column, Row } from "duckylib";
    import coduhLogo from "$lib/assets/logo.png";
    import { page } from "$app/state";
    import { MediaQuery } from "svelte/reactivity";
    import {
        PUBLIC_MOBILE_SIZE_PX,
        PUBLIC_TABLET_SIZE_PX,
        PUBLIC_TWITCH_CHANNEL,
    } from "$env/static/public";
    import { AppConfig } from "$lib/config";
    import SocialCard from "$lib/components/SocialCard.svelte";
    import { onMount } from "svelte";

    let domainSplit = page.url.hostname.split(".");
    let tld = domainSplit[domainSplit.length - 1];
    let hasSubdomain = domainSplit.length > 2;
    let domain = hasSubdomain ? domainSplit[1] : domainSplit[0];

    let tabletQuery = new MediaQuery(`max-width: ${PUBLIC_TABLET_SIZE_PX}px`);
    let mobileQuery = new MediaQuery(`max-width: ${PUBLIC_MOBILE_SIZE_PX}px`);

    const { data }: { data: any } = $props();

    let stream = $derived(data.stream || null);
    let vod = $derived(data.vod || null);

    // let isMobile = true;

    let isMobile = $state(tabletQuery.current || mobileQuery.current);

    let socials = AppConfig.socials;

    onMount(() => {
        console.log("STREAM", stream);
        console.log("VOD", vod);
    });

    $effect(() => {
        isMobile =
            (stream == null && vod == null) ||
            tabletQuery.current ||
            mobileQuery.current;
        console.log("MOBILE", isMobile);
    });
</script>

<div class="container">
    <div class="heading">
        <Row heightPx="fit" widthPx="fit">
            <img src={coduhLogo} alt="coduh icon" draggable={false} />
            <Row
                heightPx="fit"
                widthPx="fit"
                gapEm={0.2}
                justifyContent="flex-start"
                alignItems="flex-end"
            >
                <h1 class="font">{domain}</h1>
                <h2 class="font faded">.{tld}</h2>
            </Row>
        </Row>
    </div>
    <div class="bottom">
        <div
            class="left"
            style:width={isMobile ? "100%" : "40%"}
            style:justify-content={isMobile ? "center" : "flex-start"}
            style:position={isMobile ? "relative" : "absolute"}
            style={isMobile ? "margin-left: auto; margin-right: auto;" : ""}
        >
            <Column alignItems={isMobile ? "center" : "flex-start"}>
                <Row widthPx="fit" alignItems="center">
                    <h1 class="font hero">FOLLOW CODUH</h1>
                    <p class="font faded">[or else]</p>
                </Row>
            </Column>
            <Column
                alignItems={isMobile ? "center" : "flex-start"}
                gapEm={0.33}
            >
                {#each socials as social}
                    <SocialCard {social} {stream} {vod} />
                {/each}
            </Column>
        </div>
        {#if !isMobile}
            <div
                class="right"
                style:width={isMobile ? "100%" : "50%"}
                style:justify-content={isMobile ? "center" : "flex-end"}
                style:position={isMobile ? "relative" : "absolute"}
                style={isMobile ? "margin-left: auto; margin-right: auto;" : ""}
            >
                <Column alignItems={isMobile ? "center" : "flex-end"}>
                    <h1 class="font hero">
                        {stream ? "CODUH IS LIVE!" : "RECENT VOD"}
                    </h1>
                </Column>
                <Column
                    alignItems={isMobile ? "center" : "flex-end"}
                    gapEm={0.66}
                >
                    {#if stream}
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <iframe
                            src="https://player.twitch.tv/?channel={PUBLIC_TWITCH_CHANNEL}&parent={page
                                .url.hostname}&muted=true"
                            allowfullscreen
                        >
                        </iframe>
                        <Column
                            heightPx="fill"
                            marginLeftPx="auto"
                            marginRightPx="auto"
                            alignItems="flex-start"
                            gapEm={0.33}
                        >
                            <Row
                                widthPx="fill"
                                heightPx="fit"
                                justifyContent="space-between"
                                textWrap
                            >
                                <h3 class="font">
                                    {stream.title.trim()}
                                </h3>
                            </Row>
                            <p class="font faded">
                                Started {new Intl.DateTimeFormat("en-US", {
                                    timeStyle: "long",
                                    timeZone: "America/New_York",
                                }).format(new Date(stream.started_at))} &bullet;
                                <a href="/twitch">Watch on Twitch</a>
                            </p>
                        </Column>
                    {:else if vod}
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <iframe
                            src="https://player.twitch.tv/?video={vod.id}&parent={page
                                .url.hostname}&muted=true"
                            allowfullscreen
                        >
                        </iframe>
                        <Column
                            heightPx="fill"
                            marginLeftPx="auto"
                            marginRightPx="auto"
                            alignItems="flex-start"
                            gapEm={0.33}
                        >
                            <Row
                                widthPx="fill"
                                heightPx="fit"
                                justifyContent="space-between"
                                textWrap
                            >
                                <h3 class="font">
                                    {vod.title.replace(/\[.*\]/i, "").trim()}
                                </h3>
                            </Row>
                            <p class="font faded">
                                Published {new Intl.DateTimeFormat("en-US", {
                                    dateStyle: "medium",
                                }).format(new Date(vod.created_at))} &bullet;
                                <a href="/twitch">Watch on Twitch</a>
                            </p>
                        </Column>
                    {/if}
                </Column>
            </div>
        {/if}
    </div>
</div>

<style>
    @import url("$lib/styles/fonts.css");

    .heading img {
        height: 4em;
    }

    .container {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 4em;
        position: relative;
    }

    .left,
    .right {
        display: flex;
        /*min-width: 50%;*/
        width: fit-content;
        height: fit-content;
    }

    .left {
        left: 1em;
        display: flex;
        flex-direction: column;
        gap: 1.33em;
    }

    .right {
        position: absolute;
        right: 1em;
        display: flex;
        flex-direction: column;
        gap: 1.33em;
    }

    .right iframe {
        width: calc(100%);
        aspect-ratio: 16/9;
        outline: none;
        border: none;
        border-radius: 16px;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    }

    h3 {
        line-clamp: 1;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    svg#icon {
        height: 1em;
    }
</style>
