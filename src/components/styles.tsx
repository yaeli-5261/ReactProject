import { green } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: green,
  p: 4,
};
export const logoStyles: SxProps<Theme> = {
  flexGrow: 1,
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
};
export const popupUpdateStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const listRecipeStyle = {
  width: '95%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 3,
  height: '100vh',
  overflowY: 'auto',
};
export const recipeStyle = {
  padding: 3,
  bgcolor: 'rgba(230, 230, 230, 0.8)',
  borderRadius: 3,
  boxShadow: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};