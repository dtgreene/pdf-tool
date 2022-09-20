import React, { useRef, useEffect } from 'react';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { boysAndGirls } from 'thememirror';
import { Box, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  editor: {
    flex: 1,
  },
}));

export const StyleEditor = () => {
  const classes = useStyles();
  const rootRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    if (rootRef.current.childNodes.length === 0) {
      editorRef.current = new EditorView({
        extensions: [
          basicSetup,
          boysAndGirls,
          keymap.of([indentWithTab]),
          javascript(),
        ],
        parent: rootRef.current,
        doc: "({\n  root: {\n    fontFamily: 'Poppins',\n  },\n})\n",
      });
    }
  }, []);

  return <Box ref={rootRef} className={classes.editor}></Box>;
};
