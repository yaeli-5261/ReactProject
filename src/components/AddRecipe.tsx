import { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Container, Typography, Box, IconButton, Paper } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { UserContext } from "./User";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addRecipe } from "../store/recipeSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  products: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Product name is required"),
    })
  ).min(1, "At least one product is required"),
  instructions: yup.string().required("Instructions are required"),
});

const AddRecipe = ({ setIsAddingRecipe }: { setIsAddingRecipe: (value: boolean) => void }) => {

  const [user] = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      products: [{ name: "" }],
      instructions: ""
    },
  });

  const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({ control, name: "products" });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if(user.id==0)
      return alert('you have to login inOrder to add Recipe');
    try {
      const cleanedData = {
        ...data,
        products: data.products.filter((p: { name: '' }) => p.name.trim() !== ""),
      };

      dispatch(addRecipe({ newRecipe: cleanedData, user }))
      alert("Recipe added successfully!");
    }
    catch (error) {
      alert("Failed to add recipe.");
    }
    setIsAddingRecipe(false);
    navigate('/showRecipes');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4, backgroundColor: "rgba(0, 210, 100, 0.2)" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>Add Recipe</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Title" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
          <TextField label="Description" multiline rows={3} {...register("description")} error={!!errors.description} helperText={errors.description?.message} />

          <Typography variant="h6">Products</Typography>
          {productFields.map((item, index) => (
            <Box key={item.id} display="flex" alignItems="center" gap={1}>
              <TextField
                label={`Product ${index + 1}`}
                {...register(`products.${index}.name` as const)}
                error={!!errors.products?.[index]?.name}
                helperText={errors.products?.[index]?.name?.message}
              />
              <IconButton onClick={() => removeProduct(index)} color="error">
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <IconButton onClick={() => appendProduct({ name: "" })} color="success">
            <AddCircleOutline />
          </IconButton>
          <TextField label="Instructions" multiline rows={4} {...register("instructions")} error={!!errors.instructions} helperText={errors.instructions?.message} />
          <Button type="submit" variant="contained" color="success">Submit Recipe</Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default AddRecipe;