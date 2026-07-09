<script lang="ts">
    import favicon from "$lib/assets/logo.png";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Coduh</title>
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
