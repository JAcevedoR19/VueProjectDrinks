import { ref, watch, onMounted, computed } from 'vue';
import { defineStore } from 'pinia';
import { useDrinksStore } from './drinks';
import { useModalStore } from './modal';
import { useNotificationStore } from './notifications';

export const useFavoritesStore = defineStore('favorites', () => {

    const drinks = useDrinksStore();
    const modalStore = useModalStore();
    const favorites = ref([]);
    const notificationStore = useNotificationStore();

    onMounted(() => {
        favorites.value = JSON.parse(localStorage.getItem('favorites')) || [];
    });

    watch(favorites, () => {
        sincronizeLocalStorage();
    }, {
        deep: true
    });

    function sincronizeLocalStorage () {
        localStorage.setItem('favorites', JSON.stringify(favorites.value));
    }
    
    function existeFavoritos () {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
        return favoritosLocalStorage.some(favorito => favorito.idDrink === drinks.recipe.idDrink);
    }

    function removeFavorite (id) {
        favorites.value = favorites.value.filter(favorito => favorito.idDrink !== drinks.recipe.idDrink);

        notificationStore.show = true;
        notificationStore.text = 'Eliminado de favoritos';

        setTimeout(() => {
            notificationStore.$reset();
        }, 3000);
    }

    function addFavorite () {
        favorites.value.push(drinks.recipe);

        notificationStore.show = true;
        notificationStore.text = 'Agregado a favoritos';

        setTimeout(() => {
            notificationStore.$reset();
        }, 3000);
        
    }

    function handleCklickFavorite () {
        if(existeFavoritos()) {
            removeFavorite();
        } else {
            addFavorite();
        }
        modalStore.showModal = false;
    }

    const noFavorites = computed(() => {
        return favorites.value.length === 0;
    });

    return {
        favorites,
        handleCklickFavorite,
        existeFavoritos,
        noFavorites
    }
    
});