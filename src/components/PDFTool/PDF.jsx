import React from 'react';
import {
  PDFViewer,
  Document,
  Page,
  Image,
  View,
  Text,
  Link,
  Note,
} from '@react-pdf/renderer';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { FaceFrownIcon } from '@heroicons/react/24/solid';

import { ComponentTypes } from 'constants';

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    background: '#1a1d22',
    boxShadow: theme.shadows[2],
    alignSelf: 'flex-start',
    maxWidth: '400px',
  },
  face: {
    margin: theme.spacing(2),
  },
}));

const Components = {
  [ComponentTypes.DOCUMENT]: Document,
  [ComponentTypes.PAGE]: Page,
  [ComponentTypes.VIEW]: View,
  [ComponentTypes.IMAGE]: Image,
  [ComponentTypes.TEXT]: Text,
  [ComponentTypes.LINK]: Link,
  [ComponentTypes.NOTE]: Note,
};

const ErrorFallback = ({ error }) => {
  const classes = useStyles();
  return (
    <Box className={classes.error}>
      <FaceFrownIcon className={classes.face} width={100} height={100} />
      <Typography>There was an error rendering this PDF</Typography>
      <Typography color="textSecondary">{error.message}</Typography>
    </Box>
  );
};

export const PDF = ({ layout, layoutProps }) => {
  const classes = useStyles();

  return (
    <Box className={classes.body}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
          <Layout layout={layout} layoutProps={layoutProps} />
        </PDFViewer>
      </ErrorBoundary>
    </Box>
  );
};

const Layout = ({ layout, layoutProps }) => {
  const Component = Components[layout.type];
  const componentProps = layoutProps[layout.id] ?? {};

  if (layout.type === ComponentTypes.STRING) {
    return componentProps.text ?? '';
  } else if (!Component) {
    throw new Error(`Unknown component type: ${layout.type}`);
  }

  if (layout.children.length > 0) {
    return (
      <Component key={layout.id} {...componentProps}>
        {layout.children.map((child) => (
          <Layout key={child.id} layout={child} layoutProps={layoutProps} />
        ))}
      </Component>
    );
  }

  return <Component {...componentProps} />;
};
