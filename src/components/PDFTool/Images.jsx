import React from 'react';
import { PuzzlePieceIcon } from '@heroicons/react/24/solid';
import {
  Box,
  Button,
  Divider,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  images: {
    marginBottom: theme.spacing(4),
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  col: {
    width: '50%',
  },
  image: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[800]}`,
    borderRadius: theme.shape.borderRadius,
    '& :not:last-child()': {
      marginBottom: theme.spacing(2),
    },
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
  },
}));

export const Images = ({ images }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.images}>
        {images.map((image) => (
          <Box key={image.id} className={classes.image}>
            <Box className={classes.row}>
              <Box className={classes.col}>
                <Typography>Key</Typography>
              </Box>
              <Box className={classes.col}>
                <TextField fullWidth variant="outlined" />
              </Box>
            </Box>
            <Box className={classes.row}>
              <Box className={classes.col}>
                <Typography>Source URL</Typography>
              </Box>
              <Box className={classes.col}>
                <TextField fullWidth variant="outlined" />
              </Box>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.row}>
              <Box className={classes.col}>
                <Typography>File</Typography>
              </Box>
              <Box className={classes.col}>
                <TextField
                  fullWidth
                  variant="outlined"
                  disabled
                  placeholder="No file chosen"
                />
              </Box>
            </Box>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              component="label"
            >
              Upload <input type="file" hidden />
            </Button>
          </Box>
        ))}
        {images.length === 0 && (
          <Box className={classes.noResults}>
            <PuzzlePieceIcon width={75} height={75} />
            <span>No images have been added</span>
          </Box>
        )}
      </Box>
      <Box className={classes.buttonRow}>
        <Button color="primary" variant="contained">
          Add image
        </Button>
      </Box>
    </>
  );
};
