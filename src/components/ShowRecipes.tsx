import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, RecipeType, selectRecipes } from '../store/recipeSlice';
import { AppDispatch } from '../store/store';
import { List, ListItem, ListItemText, Button, Box, Typography, ButtonGroup, Divider } from '@mui/material';
import {listRecipeStyle, recipeStyle } from './styles';

const ShowRecipes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(selectRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleRecipeClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      </Box>
      <Box sx={{ flex: 1, padding: 2 }}>
        {selectedRecipe && (
          <Box sx={recipeStyle}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#222' }}>
              {selectedRecipe.title}
            </Typography>
            <Divider />
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1, color: '#444' }}>
              תאור המתכון:
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              {selectedRecipe.description}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2, color: '#444' }}>
              מצרכים:
            </Typography>
            {selectedRecipe.products && selectedRecipe.products.length > 0 ? (
              selectedRecipe.products.map((product, index) => (
                <ListItem key={index}>
                  <ListItemText primary={product.name} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: '#777', paddingLeft: 2 }}>
                לא צוינו מצרכים למתכון זה.
              </Typography>
            )}
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2, color: '#444' }}>
              אופן הכנה:
            </Typography>
            <Typography variant="body1" sx={{ color: '#333' }}>
              {selectedRecipe.instructions}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <List sx={listRecipeStyle}>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id} sx={{ marginBottom: 1 }}>
              <ButtonGroup variant="contained" color="primary" fullWidth>
                <Button
                  onClick={() => handleRecipeClick(recipe)}
                  sx={{
                    padding: 2,
                    backgroundColor: 'rgba(0, 189, 55, 0.4)',
                    '&:hover': { backgroundColor: 'rgba(0, 123, 55, 0.7)' },
                  }}
                >
                  <ListItemText
                    primary={recipe.title}
                    secondary={recipe.description}
                    sx={{ textAlign: 'center', color: 'white' }}
                  />
                </Button>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
export default ShowRecipes;
