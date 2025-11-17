import React from 'react';
import type { Recipe, Product } from '../types';
import PlusIcon from '../components/icons/PlusIcon';
import EditIcon from '../components/icons/EditIcon';
import TrashIcon from '../components/icons/TrashIcon';

interface RecipesPageProps {
  recipes: Recipe[];
  products: Product[];
  onAdd: () => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: string) => void;
  onProduce: (recipe: Recipe) => void;
}

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

const RecipeCard: React.FC<{ recipe: Recipe; productMap: Map<string, string>; onEdit: () => void; onDelete: () => void; onProduce: () => void; }> = ({ recipe, productMap, onEdit, onDelete, onProduce }) => {
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-stone-800">{recipe.name}</h3>
        <div className="mt-4">
          <h4 className="font-semibold text-sm text-stone-600">Ingredientes:</h4>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-stone-700">
            {recipe.ingredients.map(ing => (
              <li key={ing.productId}>
                {productMap.get(ing.productId) || 'Insumo desconhecido'}: {ing.quantity}
              </li>
            ))}
          </ul>
        </div>
        {recipe.instructions && (
           <div className="mt-4">
              <h4 className="font-semibold text-sm text-stone-600">Instruções:</h4>
              <p className="text-sm text-stone-700 mt-1 whitespace-pre-wrap">{recipe.instructions}</p>
           </div>
        )}
      </div>
      <div className="p-4 bg-stone-50 grid grid-cols-3 gap-2">
        <button onClick={onEdit} className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-orange-800 bg-orange-100 hover:bg-orange-200 transition-colors">
          <EditIcon className="w-4 h-4 mr-2"/> Editar
        </button>
        <button onClick={onDelete} className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-red-800 bg-red-100 hover:bg-red-200 transition-colors">
          <TrashIcon className="w-4 h-4 mr-2"/> Remover
        </button>
        <button onClick={onProduce} className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-green-800 bg-green-100 hover:bg-green-200 transition-colors">
          <PlayIcon className="w-4 h-4 mr-2"/> Produzir
        </button>
      </div>
    </div>
  );
}

const RecipesPage: React.FC<RecipesPageProps> = ({ recipes, products, onAdd, onEdit, onDelete, onProduce }) => {
  const productMap = React.useMemo(() => new Map(products.map(p => [p.id, p.name])), [products]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-stone-700">Minhas Receitas</h2>
        <button onClick={onAdd} className="inline-flex items-center justify-center rounded-md bg-orange-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-900 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nova Receita
        </button>
      </div>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                productMap={productMap}
                onEdit={() => onEdit(recipe)}
                onDelete={() => onDelete(recipe.id)}
                onProduce={() => onProduce(recipe)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm">
          <p className="text-stone-600 text-xl font-semibold">Nenhuma receita cadastrada</p>
          <p className="text-stone-500 mt-2">Clique em "Nova Receita" para começar.</p>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
