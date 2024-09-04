import { ref, reactive, onMounted } from 'vue';
import { defineStore } from 'pinia';
import APIService from '@/services/APIService';

export const useDrinksStore = defineStore('drinks', () => {

    const categories = ref([]);
    const search = reactive({
        name: '',
        category: ''
    })

    const recipes = ref([]);

    onMounted(async () => {
        const {data: { drinks }} = await APIService.getCategories();
        categories.value = drinks;
    });

    async function getRecipe() {
        const {data: { drinks }} =await APIService.getRecipes(search);
        recipes.value = drinks;
    }

    return { 
        categories,
        search,
        getRecipe
    };
});