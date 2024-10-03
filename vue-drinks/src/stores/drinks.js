import { ref, reactive, onMounted, computed } from 'vue';
import { defineStore } from 'pinia';
import APIService from '@/services/APIService';
import { useModalStore } from './modal';

export const useDrinksStore = defineStore('drinks', () => {

    const modalStore = useModalStore();
    const categories = ref([]);
    const search = reactive({
        name: '',
        category: ''
    })

    const recipes = ref([]);
    const recipe = ref({});

    onMounted(async () => {
        const {data: { drinks }} = await APIService.getCategories();
        categories.value = drinks;
    });

    async function getRecipe() {
        const {data: { drinks }} = await APIService.getRecipes(search);
        recipes.value = drinks;
    }

    async function selectDrink(id){
        const {data: { drinks }} = await APIService.getRecipe(id);
        recipe.value = drinks[0];

        modalStore.handleClickModal();
    }

    const noResults = computed(() => {
        return recipes.value.length === 0;
    });

    return { 
        categories,
        search,
        getRecipe,
        recipes,
        selectDrink,
        recipe,
        noResults
    };
});