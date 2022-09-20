import React from 'react';
import {
  PlusIcon,
  PuzzlePieceIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import {
  Box,
  Button,
  Typography,
  TextField,
  makeStyles,
  Divider,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
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
  fonts: {
    marginBottom: theme.spacing(4),
  },
  font: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[800]}`,
    borderRadius: theme.shape.borderRadius,
    '& :not:last-child()': {
      marginBottom: theme.spacing(2),
    },
  },
  fontRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontItem: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: '#27272b',
    position: 'relative',
    '&:hover $deleteButton': {
      opacity: 1,
    },
  },
  deleteButton: {
    borderRadius: '50%',
    padding: '4px',
    minWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(-50%, -50%)',
    opacity: 0,
    transition: `opacity ${theme.transitions.duration.short}ms ease-in-out`,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

export const Fonts = ({ fonts }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.fonts}>
        {fonts.map((font) => (
          <Box key={font.id} className={classes.font}>
            <Box className={classes.row}>
              <Box className={classes.col}>
                <Typography>Family</Typography>
              </Box>
              <Box className={classes.col}>
                <TextField fullWidth variant="outlined" />
              </Box>
            </Box>
            <Box className={classes.fontRow}>
              <Typography>Sources</Typography>
              <IconButton color="secondary">
                <PlusIcon width={24} height={24} />
              </IconButton>
            </Box>
            <Divider className={classes.divider} />
            {font.sources.map((child) => (
              <Box key={child.id} className={classes.fontItem}>
                <Button variant="outlined" className={classes.deleteButton}>
                  <XMarkIcon width={20} height={20} />
                </Button>
                <Box className={classes.row}>
                  <Box className={classes.col}>
                    <Typography>Source URL</Typography>
                  </Box>
                  <Box className={classes.col}>
                    <TextField fullWidth variant="outlined" />
                  </Box>
                </Box>
                <Box className={classes.row}>
                  <Box className={classes.col}>
                    <Typography>Style</Typography>
                  </Box>
                  <Box className={classes.col}>
                    <TextField fullWidth variant="outlined" />
                  </Box>
                </Box>
                <Box className={classes.row}>
                  <Box className={classes.col}>
                    <Typography>Weight</Typography>
                  </Box>
                  <Box className={classes.col}>
                    <TextField fullWidth variant="outlined" />
                  </Box>
                </Box>
              </Box>
            ))}
            <Button fullWidth variant="outlined">
              Delete
            </Button>
          </Box>
        ))}
        {fonts.length === 0 && (
          <Box className={classes.noResults}>
            <PuzzlePieceIcon width={75} height={75} />
            <span>No fonts have been added</span>
          </Box>
        )}
      </Box>
      <Box className={classes.buttonRow}>
        <Button color="primary" variant="contained">
          Add font
        </Button>
      </Box>
    </>
  );
};
