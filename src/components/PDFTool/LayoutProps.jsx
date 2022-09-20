import React from 'react';
import {
  Box,
  Select,
  MenuItem,
  makeStyles,
  TextField,
  Typography,
  Switch,
} from '@material-ui/core';

import { ComponentProps, ControlTypes } from 'constants';

const useStyles = makeStyles((theme) => ({
  props: {
    border: `1px solid ${theme.palette.grey[800]}`,
    borderRadius: theme.shape.borderRadius,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    '&:nth-child(odd)': {
      background: '#1a1a1e'
    }
  },
  col: {
    width: '50%',
  },
  overflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export const LayoutProps = ({ selectedLayout, layoutProps, context }) => {
  const classes = useStyles();
  const propEntries = Object.entries(ComponentProps[selectedLayout.type]);

  return (
    <Box className={classes.props}>
      {propEntries.map(([key, { control, defaultValue }]) => {
        let input = null;

        if (control.type === ControlTypes.TEXT) {
          input = (
            <TextField
              variant="outlined"
              defaultValue={defaultValue}
              {...context.register(key)}
            />
          );
        } else if (control.type === ControlTypes.SELECT) {
          input = (
            <Select variant="outlined" fullWidth defaultValue={defaultValue}>
              {control.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          );
        } else if (control.type === ControlTypes.BOOLEAN) {
          input = <Switch defaultChecked={defaultValue} />;
        }

        return (
          <Box key={key} className={classes.row}>
            <Box className={classes.col}>
              <Typography className={classes.overflow}>{key}</Typography>
            </Box>
            <Box className={classes.col}>{input}</Box>
          </Box>
        );
      })}
    </Box>
  );
};
