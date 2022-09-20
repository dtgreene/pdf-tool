import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, makeStyles, MenuItem, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { ComponentTypes, ComponentChildren } from 'constants';

const useStyles = makeStyles((theme) => ({
  layout: {
    maxHeight: '400px',
    overflowY: 'auto',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[800]}`,
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
  },
  item: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    borderBottom: '1px solid transparent',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.6,
    },
  },
  highlight: {
    position: 'absolute',
    width: '100%',
    height: '40px',
    left: 0,
    background: '#bad8ff',
    opacity: 0.3,
    pointerEvents: 'none',
  },
  drag: {
    borderColor: theme.palette.common.white,
  },
  line: {
    width: '1px',
    marginRight: '8px',
    background: theme.palette.grey[800],
  },
  contextMenu: {
    position: 'fixed',
    padding: `${theme.spacing(1)}px 0`,
    background: theme.palette.common.black,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[800]}`,
    minWidth: '300px',
    boxShadow: theme.shadows[2],
    zIndex: 10,
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  deleteBtn: {
    margin: '0px 16px 0 16px',
    flex: 1,
  },
}));

export const ItemTypes = {
  ITEM: 'item',
};

export const ItemActions = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  DELETE: 'DELETE',
};

const defaultContextState = {
  visible: false,
  id: '',
  type: '',
  parentId: '',
  position: {
    x: 0,
    y: 0,
  },
};

export const Layout = ({
  layout,
  selected,
  onItemClick,
  onItemDragDrop,
  onItemAction,
  onAddComponent,
}) => {
  const classes = useStyles();
  const rootRef = useRef();
  const contextRef = useRef();
  const [context, setContext] = useState(defaultContextState);

  useEffect(() => {
    const contextHandler = (event) => {
      const id = event.target.getAttribute('data-id');
      const type = event.target.getAttribute('data-type');
      const parentId = event.target.getAttribute('data-parent-id');

      if (id) {
        event.preventDefault();
        
        // also call on the onClick callback
        onItemClick(id)

        setContext({
          visible: true,
          id,
          type,
          parentId,
          position: {
            x: event.clientX,
            y: event.clientY,
          },
        });
      }
    };

    const clickHandler = (event) => {
      // if the user clicks outside of the context menu
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setContext(defaultContextState);
      }
    };

    rootRef.current.addEventListener('contextmenu', contextHandler);
    document.addEventListener('click', clickHandler);

    return () => {
      rootRef.current.addEventListener('contextmenu', contextHandler);
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  const handleAddComponentClick = (type) => {
    onAddComponent(context.id, type);
    setContext(defaultContextState);
  };

  const handleItemActionClick = (action) => {
    onItemAction(context.id, context.parentId, action);
    setContext(defaultContextState);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className={classes.layout} ref={rootRef}>
        <Item
          layout={layout}
          selected={selected}
          onClick={onItemClick}
          onDragDrop={onItemDragDrop}
          classes={classes}
        />
        {context.visible && (
          <Box
            ref={contextRef}
            className={classes.contextMenu}
            style={{ top: context.position.y, left: context.position.x }}
          >
            <NestedMenu
              className={classes.flexBetween}
              menuClassName={classes.contextMenu}
              menuChildren={
                <ComponentMenu
                  parentType={context.type}
                  onClick={handleAddComponentClick}
                />
              }
            >
              <Box className={classes.iconRow}>
                <PlusIcon width={20} height={20} />
                <span>Add Component</span>
              </Box>
              <ChevronRightIcon width={24} height={24} />
            </NestedMenu>
            <MenuItem
              component="div"
              className={classes.iconRow}
              onClick={() => handleItemActionClick(ItemActions.MOVE_UP)}
            >
              <ArrowUpIcon width={20} height={20} />
              <span>Move Up</span>
            </MenuItem>
            <MenuItem
              component="div"
              className={classes.iconRow}
              onClick={() => handleItemActionClick(ItemActions.MOVE_DOWN)}
            >
              <ArrowDownIcon width={20} height={20} />
              <span>Move Down</span>
            </MenuItem>
            <MenuItem
              component="div"
              disabled={context.type === ComponentTypes.DOCUMENT}
              onClick={() => handleItemActionClick(ItemActions.DELETE)}
            >
              <Typography color="error" className={classes.iconRow}>
                <TrashIcon width={20} height={20} />
                Delete
              </Typography>
            </MenuItem>
          </Box>
        )}
      </Box>
    </DndProvider>
  );
};

const defaultNestedState = {
  show: false,
  position: {
    x: 0,
    y: 0,
  },
};

const ComponentMenu = ({ parentType, onClick }) => {
  const validChildren = ComponentChildren[parentType] ?? [];

  return Object.entries(ComponentTypes).map(([key, value]) => (
    <MenuItem
      key={key}
      component="div"
      disabled={validChildren.indexOf(value) === -1}
      onClick={() => onClick(value)}
    >
      {value}
    </MenuItem>
  ));
};

const NestedMenu = ({ className, children, menuClassName, menuChildren }) => {
  const menuRef = useRef();
  const [state, setState] = useState(defaultNestedState);

  useEffect(() => {
    const mouseOverHandler = () => {
      const rect = menuRef.current.getBoundingClientRect();
      setState({
        show: true,
        position: {
          x: rect.right,
          y: rect.top - 9,
        },
      });
    };

    const mouseLeaveHandler = () => {
      setState(defaultNestedState);
    };

    menuRef.current.addEventListener('mouseover', mouseOverHandler);
    menuRef.current.addEventListener('mouseleave', mouseLeaveHandler);
    return () => {
      menuRef.current.removeEventListener('mouseover', mouseOverHandler);
      menuRef.current.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, []);

  return (
    <MenuItem component="div" className={className} ref={menuRef}>
      {children}
      {state.show && (
        <Box
          className={menuClassName}
          style={{ top: state.position.y, left: state.position.x }}
        >
          {menuChildren}
        </Box>
      )}
    </MenuItem>
  );
};

const Item = ({
  layout,
  selected,
  onClick,
  onDragDrop,
  classes,
  parentId = '',
  depth = 0,
}) => {
  const [, drag] = useDrag(() => ({
    type: 'item',
    item: { layout, parentId },
  }), []);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      drop: (item) => {
        onDragDrop(item, layout);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [layout, onDragDrop]
  );

  const content = (
    <Box key={layout.id} ref={drop}>
      <Box
        className={classNames(classes.item, {
          [classes.drag]: isOver,
        })}
        onClick={() => onClick(layout.id)}
        data-id={layout.id}
        data-type={layout.type}
        data-parent-id={parentId}
        ref={drag}
      >
        {selected === layout.id && <Box className={classes.highlight} />}
        {layout.title}
      </Box>
    </Box>
  );

  if (layout.children.length > 0) {
    return (
      <Fragment key={layout.id}>
        {content}
        <Box display="flex">
          <Box className={classes.line} />
          <Box flex={1}>
            {layout.children.map((child) => (
              <Item
                key={child.id}
                layout={child}
                selected={selected}
                onClick={onClick}
                onDragDrop={onDragDrop}
                classes={classes}
                parentId={layout.id}
                depth={depth + 1}
              />
            ))}
          </Box>
        </Box>
      </Fragment>
    );
  }

  return content;
};
