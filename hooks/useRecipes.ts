import { useState, useCallback } from 'react';
import type { Recipe } from '../types';

const initialRecipes: Recipe[] = [
    {
        id: 'rec1',
        name: 'Massa de Pão Francês',
        ingredients: [
            { productId: '1', quantity: 5 }, // 5kg Farinha
            { productId: '6', quantity: 0.05 }, // 50g Fermento
        ],
        instructions: 'Misture os ingredientes secos, adicione água aos poucos e sove por 15 minutos. Deixe descansar por 1 hora. Modele os pães e deixe crescer por mais 30 minutos. Asse em forno pré-aquecido a 200°C.'
    },
    {
        id: 'rec2',
        name: 'Massa de Bolo de Chocolate',
        ingredients: [
            { productId: '1', quantity: 0.5 }, // 500g Farinha
            { productId: '2', quantity: 4 }, // 4 Ovos
            { productId: '3', quantity: 0.4 }, // 400g Açúcar
            { productId: '5', quantity: 0.2 }, // 200ml Leite
            { productId: '7', quantity: 0.1 }, // 100g Chocolate
        ],
        instructions: 'Bata os ovos com o açúcar. Adicione o leite e os ingredientes secos peneirados. Misture bem e asse em forma untada por 40 minutos a 180°C.'
    }
];

export const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

    const addRecipe = useCallback((recipeData: Omit<Recipe, 'id'>) => {
        const newRecipe: Recipe = {
            ...recipeData,
            id: crypto.randomUUID(),
        };
        setRecipes(prev => [newRecipe, ...prev]);
    }, []);

    const updateRecipe = useCallback((updatedRecipe: Recipe) => {
        setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    }, []);

    const deleteRecipe = useCallback((recipeId: string) => {
        setRecipes(prev => prev.filter(r => r.id !== recipeId));
    }, []);

    return {
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
    };
};
