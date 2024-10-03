<script setup>
    import Recipes from '@/components/Recipes.vue';
    import { useDrinksStore } from '../stores/drinks'

    const store = useDrinksStore();
</script>

<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>

    <p v-if="store.noResults" class="text-3xl text-center my-10">No hay resultados. Utiliza el formulario para obtener una receta de bebida</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
        <Recipes v-for="recipe in store.recipes" :key="recipe.idDrink" :recipe="recipe" />
    </div>
</template>