<script setup>
    import { useDrinksStore } from '@/stores/drinks';

    const store = useDrinksStore();

    defineProps({
        recipe: {
            type: Object,
        }
    })
</script>

<template>
    <div class="border shadow-lg rounded">
        <div class="overflow-hidden">
            <img class="hover:scale-125 transition-transform duration-300 hover:rotate-2" :src="recipe.strDrinkThumb" :alt="'Imagen de: ' + recipe.strDrink">
        </div>
        <div class="p-5">
            <h2 class="text-2xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
            <button type="button" 
                class="text-white bg-orange-400 hover:bg-orange-500 font-bold w-full p-3 rounded text-center mt-5"
                @click="store.selectDrink(recipe.idDrink)">
                Ver receta
            </button>
        </div>

    </div>
</template>