<script lang="ts">
    import type { Social } from "$lib/config";
    import { Column, Row } from "duckylib";

    import arrowIcon from "$lib/assets/icons/arrow.png";
    import {
        PUBLIC_TABLET_SIZE_PX,
        PUBLIC_MOBILE_SIZE_PX,
    } from "$env/static/public";
    import { MediaQuery } from "svelte/reactivity";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    interface SocialCardProps {
        social: Social;
        stream?: any | null;
        vod?: any | null;
    }

    const { social, stream, vod }: SocialCardProps = $props();

    let tabletQuery = new MediaQuery(`max-width: ${PUBLIC_TABLET_SIZE_PX}px`);
    let mobileQuery = new MediaQuery(`max-width: ${PUBLIC_MOBILE_SIZE_PX}px`);

    let isMobile = $state(tabletQuery.current || mobileQuery.current);

    $effect(() => {
        isMobile = tabletQuery.current || mobileQuery.current;
        console.log("MOBILE", isMobile);
    });

    let members = $state(0);
    const backgroundColor = "#0c2227cc";
    let hovered = $state(false);

    onMount(async () => {
        if (social.id === "discord") {
            const inviteSplit = social.url.split("discord.gg/");
            const code = inviteSplit[1].trim();
            const res = await (
                await fetch(`https://discord.com/api/v10/invites/${code}`)
            ).json();

            if (res && res?.profile) {
                members = res.profile.member_count;
            }
        }
    });
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    class="container"
    style:border="var(--stroke-width) solid {social.color}B2"
    style:background-color={hovered ? `${social.color}B2` : backgroundColor}
    onmouseover={() => (hovered = true)}
    onmouseleave={() => (hovered = false)}
    onclick={() => {
        if (browser) {
            try {
                window.open(`/${social.id}`, "_blank");
            } catch (e) {
                window.location.replace(`/${social.id}`);
            }
        }
    }}
>
    <Row widthPx="fill" justifyContent="space-between">
        <div class="left">
            <Row widthPx="fit">
                <img src={social.icon} alt="{social.id} icon" />
                <Column alignItems="flex-start" gapEm={0.8}>
                    <Row heightPx="fit" widthPx="fit" gapEm={0.66}>
                        <h3 class="font">
                            {social.handlePrefix}{social.handle}
                        </h3>
                        {#if social.id === "twitch" && stream}
                            <div class="live">
                                <p class="font">LIVE NOW!</p>
                            </div>
                        {/if}
                    </Row>
                    {#if social?.description && !isMobile}
                        <p class="font faded">
                            {social.description.replace(
                                "{members}",
                                members.toLocaleString(),
                            )}
                        </p>
                    {/if}
                </Column>
            </Row>
        </div>
        <div class="right">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                id="icon"
            >
                <path
                    d="M5.62 25.24L0 19.62L12.74 6.86H2.84V0H25.24V22.4H18.4V12.5L5.62 25.24Z"
                    fill={hovered ? social.color : "white"}
                />
            </svg>
        </div>
    </Row>
</div>

<style>
    @import url("$lib/styles/fonts.css");

    .container {
        --stroke-width: 3px;
        --border: 8px;

        /*background-color: var(--background-color);*/
        transition: all 0.3s;
        width: 100%;
        padding: 0.7em 1em;
        border-radius: var(--border);
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    }

    #icon {
        transition: all 0.3s;
        transform: scale(0.7);
    }

    .container:hover {
        transition: all 0.3s;
        transform: scale(1.01);
        cursor: pointer;

        #icon path {
            transition: 0.3s all;
            stroke: white;
            stroke-width: 3px;
            stroke-linejoin: round;
        }

        #icon {
            transform: scale(0.9);
        }
    }

    p {
        line-clamp: 1;
        -webkit-line-clamp: 1;
    }

    img {
        height: 2em;
    }

    .live {
        background-color: rgba(0, 0, 0, 0.25);
        padding: 0.33em 0.66em;
        border-radius: var(--border);
        p {
            color: aqua !important;
        }
    }
</style>
