import React, { useState, useMemo } from 'react';
import { Typography, Box, makeStyles, Tabs, Tab } from '@material-ui/core';
import update from 'immutability-helper';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import _ from 'lodash';

import { ComponentTypes, ComponentChildren } from 'constants';
import { randomId } from 'utils';
import { ItemActions, Layout } from './Layout';
import { LayoutProps } from './LayoutProps';
import { PDF } from './PDF';
import { StyleEditor } from './StyleEditor';
import { Fonts } from './Fonts';
import { Images } from './Images';

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100%',
    display: 'flex',
  },
  sidebar: {
    height: '100%',
    width: '400px',
    boxShadow: theme.shadows[2],
    zIndex: 10,
    background: '#121215',
    overflowY: 'auto',
  },
  sidebarLeft: {
    padding: theme.spacing(2),
  },
  sidebarRight: {
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  between: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    background: '#2a2a2e',
  },
  tab: {
    minWidth: 'auto',
  },
  tabPanel: {
    padding: theme.spacing(2),
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const defaultLayout = createLayout(ComponentTypes.DOCUMENT, [
  createLayout(ComponentTypes.PAGE),
]);

const ShowIf = ({ show, children }) => (show ? children : null);

export const PDFTool = () => {
  const classes = useStyles();

  const [layout, setLayout] = useState(defaultLayout);
  const [selected, setSelected] = useState(layout.id);
  const [layoutProps, setLayoutProps] = useState({});
  const [fonts, setFonts] = useState([
    {
      family: '',
      id: randomId(),
      sources: [
        {
          url: '',
          style: 'normal',
          weight: 'normal',
          id: randomId(),
        },
        {
          url: '',
          style: 'normal',
          weight: 'normal',
          id: randomId(),
        },
      ],
    },
  ]);
  const [images, setImages] = useState([
    {
      key: '',
      url: '',
      file: null,
      id: randomId(),
    },
  ]);
  const [tab, setTab] = useState(0);

  const propContext = useForm({});

  const selectedLayout = useMemo(
    () => findNested(layout, selected),
    [layout, selected]
  );

  const handleItemClick = (id) => {
    setSelected(id);
  };

  const handleItemDragDrop = (item, target) => {
    // drag and drop on itself
    if (item.layout.id === target.id) return;

    // is this item already a child of the target
    if (item.parentId === target.id) return;

    // valid children of this parent
    const children = ComponentChildren[target.type];
    // validate the parent-child type relationship
    if (children.indexOf(item.layout.type) === -1) return;

    // find this item in the layout state
    // shallow copy removes the original children array
    const itemLayout = findNested(layout, item.layout.id);
    // is the target a child below this item
    if (findNested(itemLayout, target.id)) return;

    // clone the layout
    const cloned = _.cloneDeep(layout);
    // find the current item in the cloned layout
    const current = findNested(cloned, item.layout.id);
    // find the current parent
    const parent = findNested(cloned, item.parentId);
    // find the new parent
    const newParent = findNested(cloned, target.id);

    // remove the child from the current parent
    parent.children = parent.children.filter(
      (child) => child.id !== item.layout.id
    );

    // add the item to the new parent
    newParent.children.push(current);

    // set the layout
    setLayout(cloned);
  };

  const handleAddComponent = (id, type) => {
    updateLayout(id, (target) => {
      target.children.push(createLayout(type));
    });
  };

  const handleItemAction = (id, parentId, action) => {
    if (action === ItemActions.MOVE_UP) {
      updateLayout(parentId, (target) => {
        // find the child index
        const index = _.findIndex(target.children, (child) => child.id === id);
        // if the child was found and is not the first element
        if (index !== -1 && index > 0) {
          // reference to the child
          const child = target.children[index];
          // remove the child
          target.children.splice(index, 1);
          // add the child back at the index
          target.children.splice(index - 1, 0, child);
        }
      });
    } else if (action === ItemActions.MOVE_DOWN) {
      updateLayout(parentId, (target) => {
        // find the child index
        const index = _.findIndex(target.children, (child) => child.id === id);
        // if the child was found and is not the last element
        if (index !== -1 && index < target.children.length - 1) {
          // reference to the child
          const child = target.children[index];
          // remove the child
          target.children.splice(index, 1);
          // add the child back at the index
          target.children.splice(index + 1, 0, child);
        }
      });
    } else if (action === ItemActions.DELETE) {
      setSelected(parentId);

      // filter out the child element
      updateLayout(parentId, (target) => {
        target.children = target.children.filter((child) => child.id !== id);
      });
    }
  };

  const updateLayout = (id, callback) => {
    const cloned = _.cloneDeep(layout);
    const target = findNested(cloned, id);
    if (target) {
      callback(target);
      setLayout(cloned);
    } else {
      console.warn(`Layout update failed; could not find target id ${id}`);
    }
  };

  const handleTabChange = (_, value) => {
    setTab(value);
  };

  return (
    <Box className={classes.page}>
      <Box className={classNames(classes.sidebar, classes.sidebarLeft)}>
        <Box className={classes.sidebarRow}>
          <Typography variant="h5">Layout</Typography>
          <Layout
            layout={layout}
            selected={selected}
            onItemClick={handleItemClick}
            onItemDragDrop={handleItemDragDrop}
            onItemAction={handleItemAction}
            onAddComponent={handleAddComponent}
          />
        </Box>
        <Box className={classes.sidebarRow}>
          <Box className={classes.between}>
            <Typography variant="h5">Props</Typography>
            <Typography color="textSecondary">{selectedLayout.type}</Typography>
          </Box>
          <LayoutProps
            selectedLayout={selectedLayout}
            layoutProps={layoutProps[selected]}
            context={propContext}
          />
        </Box>
      </Box>
      <Box className={classes.body}>
        <PDF layout={layout} layoutProps={layoutProps} />
      </Box>
      <Box className={classNames(classes.sidebar, classes.sidebarRight)}>
        <Tabs variant="fullWidth" value={tab} onChange={handleTabChange}>
          <Tab value={0} label="Styles" className={classes.tab} />
          <Tab value={1} label="Fonts" className={classes.tab} />
          <Tab value={2} label="Images" className={classes.tab} />
        </Tabs>
        <Box className={classes.tabPanel}>
          <ShowIf show={tab === 0}>
            <StyleEditor />
          </ShowIf>
          <ShowIf show={tab === 1}>
            <Fonts fonts={fonts} />
          </ShowIf>
          <ShowIf show={tab === 2}>
            <Images images={images} />
          </ShowIf>
        </Box>
      </Box>
    </Box>
  );
};

function createLayout(type, children = []) {
  return {
    type,
    title: type,
    id: randomId(),
    children,
  };
}

function findNested(data, id) {
  if (data.id === id) return data;

  if (data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      const nested = findNested(data.children[i], id);
      if (nested) return nested;
    }
  }

  return undefined;
}
