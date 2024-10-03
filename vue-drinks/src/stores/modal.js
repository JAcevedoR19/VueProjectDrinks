import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useFavoritesStore } from './favorites';
import { useDrinksStore } from './drinks';

export const useModalStore = defineStore('modal', () => {

    const showModal = ref(false);

    const favorites = useFavoritesStore();
    const drinks = useDrinksStore();

    const textButton = computed(() => {
        return favorites.existeFavoritos(drinks.recipe.idDrink) ? 'Eliminar de favoritos' : 'Agregar a favoritos';
    });

    function handleClickModal() {
        showModal.value = !showModal.value
    }

    return { 
        showModal,
        handleClickModal,
        textButton
    };
});