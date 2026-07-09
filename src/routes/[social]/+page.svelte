<script lang="ts">
    import { page } from "$app/state";
    import { Column } from "duckylib";
    import { onMount } from "svelte";

    const { data }: { data: any } = $props();

    let redirectUrl = data.social
        ? data.social.url
        : `${page.url.protocol}//${page.url.hostname}`;

    onMount(() => {
        setTimeout(() => {
            window.location.replace(redirectUrl);
        }, 1e3);
    });
</script>

<Column justifyContent="center" gapEm={5}>
    <Column heightPx="fit">
        {#if data.social}
            <h1 class="font hero">
                Redirecting to {data.social.id.toUpperCase()}
            </h1>
            <h3 class="font faded">
                <a href={redirectUrl}>{redirectUrl}</a>
            </h3>
        {:else}
            <h1 class="font hero">Couldn't find "{page.params.social}"</h1>
            <h3 class="font faded">
                Redirecting you to <a href={redirectUrl}>{redirectUrl}</a>
            </h3>
        {/if}
    </Column>

    <Column heightPx="fit">
        <h4 class="font faded">
            <a href={redirectUrl}>Not being redirected? Click here!</a>
        </h4>
    </Column>
</Column>

<style>
    @import url("$lib/styles/fonts.css");
</style>
