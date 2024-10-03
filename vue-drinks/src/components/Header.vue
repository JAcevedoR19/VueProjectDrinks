<script setup>
    import { computed } from 'vue'
    import { RouterLink, useRoute } from 'vue-router'
    import { useDrinksStore } from '../stores/drinks'
    import { useNotificationStore } from '@/stores/notifications';

    const route = useRoute()
    const store = useDrinksStore();
    const notification = useNotificationStore();

    const homePage = computed(() => route.name === 'home')

    const handleSubmit = () => {

        if(Object.values(store.search).includes('')) {
            notification.text = 'Todos los campos son obligatorios';
            notification.show = true;
            notification.error = true;
            return;

        }
        store.getRecipe();
    }

</script>

<template>
    <header class="bg-slate-800" :class="{ header : homePage }">
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{ name: 'home' }">
                        <img src="/img/logo.svg" alt="Logo" class="w-32">
                    </RouterLink>
                </div>

                <nav class="flex gap-4">
                    <RouterLink :to="{ name: 'home' }" class="text-white hover:text-orange-600 font-extrabold uppercase" active-class="text-orange-700">
                        Inicio
                    </RouterLink>

                    <RouterLink :to="{ name: 'favorites' }" class="text-white hover:text-orange-600 font-extrabold uppercase" active-class="text-orange-700">
                        Favoritos
                    </RouterLink>
                </nav>
            </div>

            <form class="md:w-1/2 2xl:w-1/3 bg-orange-400 p-10 my-32 rounded-lg shadow space-y-6" 
                v-if="homePage" @submit.prevent="handleSubmit">
                <div class="space-y-4">
                    <label for="ingrediente" class="text-white block uppercase font-extrabold text-lg">
                        Nombre o Ingrediente
                    </label>
                    <input type="text" name="" id="ingrediente" class="p-3 w-full focus:outline-none" placeholder="Ej. voka, limón, tequila" v-model="store.search.name">
                </div>

                <div class="space-y-4">
                    <label for="categoria" class="text-white block uppercase font-extrabold text-lg">
                        Categoria
                    </label>
                    <select id="categoria" class="p-3 w-full focus:outline-none text-black" v-model="store.search.category">
                        <option value="">-- Elegir --</option>
                        <option v-for="category in store.categories" :key="category.strCategory" :value="category.strCategory">
                            {{ category.strCategory }}
                        </option>
                    </select>
                </div>

                <input type="submit" class="w-full p-2 bg-orange-800 hover:bg-orange-900 text-white cursor-pointer font-extrabold uppercase rounded-lg" value="Buscar">
            </form>
        </div>
    </header>
</template>


<style>
    .header {
        background-image: url('/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>