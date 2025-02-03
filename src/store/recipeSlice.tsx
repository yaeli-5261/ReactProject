import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { userType } from '../components/User';

export type RecipeType = {
    id: number;
    title: string;
    description: string;
    authorId: number;
    products: { name: string }[]; 
    instructions: string;
  };
  
interface RecipeState {
    recipes: RecipeType[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (_, thunkAPI) => {
    try {
        const response = await axios.get<RecipeType[]>('http://localhost:3000/api/recipes');
        return response.data as RecipeType[];
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const addRecipe = createAsyncThunk('recipes/addRecipe', async ({ newRecipe, user }: { newRecipe: Omit<RecipeType, 'id'>; user: userType },thunkAPI) => {
    try{
    const response = await axios.post('http://localhost:3000/api/recipes', newRecipe,{ headers: { 'user-id': user.id + '' } });
    return response.data;
}
catch (error) {
    return thunkAPI.rejectWithValue(error);
}
});


const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<RecipeType[]>) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addRecipe.fulfilled, (state, action ) => {
                console.log(action.payload);
                state.recipes.push(action.payload.recipe);
            })
            .addCase(addRecipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            }) 
            .addCase(addRecipe.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
    },
});

export const selectRecipes = (state: RootState) => state.recipes.recipes;

export default recipeSlice.reducer;
