<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { useModalStore } from '@/stores/modal';
    import { useDrinksStore } from '@/stores/drinks';
    import { useFavoritesStore } from '@/stores/favorites';

    const storeModal = useModalStore();
    const storeDrinks = useDrinksStore();
    const storeFavorites = useFavoritesStore();

    const formatIngredients = () => {
        const divIngredients = document.createElement('div');

        for (let i = 1; i <= 15; i++) {
            if (storeDrinks.recipe[`strIngredient${i}`]) {
                const ingredients = storeDrinks.recipe[`strIngredient${i}`];
                const measure = storeDrinks.recipe[`strMeasure${i}`];

                const ingredientMeasure = document.createElement('p');
                ingredientMeasure.classList.add('text-lg', 'text-gray-800');
                ingredientMeasure.textContent = `${ingredients} - ${measure}`;

                divIngredients.appendChild(ingredientMeasure);            
            }
        }
        return divIngredients;
    }
</script>

<template>
    <TransitionRoot as="template" :show="storeModal.showModal" >
        <Dialog as="div" class="relative z-10" @close="storeModal.handleClickModal()">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                            <div>
                                <div class="mt-3">
                                    <DialogTitle as="h3" class="text-4xl font-extrabold my-4 text-gray-900">
                                        {{ storeDrinks.recipe.strDrink }}
                                    </DialogTitle>
                                    <img :src="storeDrinks.recipe.strDrinkThumb" :alt="'Imagen de: ' + storeDrinks.recipe.strDrink" class="w-full max-w-sm mx-auto">

                                    <DialogTitle as="h3" class="text-4xl font-extrabold my-4 text-gray-900">
                                        Ingredientes y Cantidades:
                                    </DialogTitle>

                                    <div v-html="formatIngredients().outerHTML"></div>

                                    <DialogTitle as="h3" class="text-4xl font-extrabold my-4 text-gray-900">
                                        Instrucciones:
                                    </DialogTitle>

                                    <p class="text-lg text-gray-600">{{ storeDrinks.recipe.strInstructions }}</p>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                                <button type="button"
                                    class="w-full rounded bg-gray-600 p-3 text-base font-bold uppercase text-white shadow hover:bg-gray-700"
                                    @click="storeModal.handleClickModal()"
                                >
                                    Cerrar
                                </button>
                                <button type="button" class="w-full rounded bg-orange-600 p-3 text-base font-bold uppercase text-white shadow hover:bg-orange-700"
                                    @click="storeFavorites.handleCklickFavorite(storeDrinks.recipe)">
                                    {{ storeModal.textButton }}
                                </button>
                                
                            </div> 
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
