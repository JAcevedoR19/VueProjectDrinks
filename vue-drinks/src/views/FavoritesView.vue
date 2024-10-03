<script setup>
    import Recipes from '@/components/Recipes.vue';
    import { useFavoritesStore } from '../stores/favorites';

    const favorites = useFavoritesStore();
</script>

<template>
    <h1 class="text-6xl font-extrabold">Favorites</h1>

    <p v-if="favorites.noFavorites" class="text-3xl text-center my-10">No tiene bebidas en favoritos</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
        <Recipes v-for="recipe in favorites.favorites" :key="recipe.idDrink" :recipe="recipe" />
    </div>
</template>