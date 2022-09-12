export const ControlTypes = {
  TEXT: 'TEXT',
  SELECT: 'SELECT',
  BOOLEAN: 'BOOLEAN',
};

export const ComponentTypes = {
  DOCUMENT: 'Document',
  PAGE: 'Page',
  VIEW: 'View',
  IMAGE: 'Image',
  TEXT: 'Text',
  LINK: 'Link',
  NOTE: 'Note',
  STRING: 'String',
};

export const ComponentChildren = {
  [ComponentTypes.DOCUMENT]: [ComponentTypes.PAGE],
  [ComponentTypes.PAGE]: [
    ComponentTypes.VIEW,
    ComponentTypes.IMAGE,
    ComponentTypes.TEXT,
    ComponentTypes.LINK,
    ComponentTypes.NOTE,
  ],
  [ComponentTypes.VIEW]: [
    ComponentTypes.VIEW,
    ComponentTypes.IMAGE,
    ComponentTypes.TEXT,
    ComponentTypes.LINK,
    ComponentTypes.NOTE,
  ],
  [ComponentTypes.IMAGE]: [],
  [ComponentTypes.TEXT]: [
    ComponentTypes.TEXT,
    ComponentTypes.LINK,
    ComponentTypes.STRING,
  ],
  [ComponentTypes.IMAGE]: [],
  [ComponentTypes.LINK]: [ComponentTypes.TEXT],
  [ComponentTypes.NOTE]: [],
  [ComponentTypes.STRING]: [],
};

export const ComponentProps = {
  [ComponentTypes.DOCUMENT]: {
    title: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
    author: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
    subject: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
    keywords: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
    creator: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: 'react-pdf',
    },
    producer: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: 'react-pdf',
    },
    pdfVersion: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '1.3',
    },
    language: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
    pageMode: {
      control: {
        type: ControlTypes.SELECT,
        options: [
          'useNone',
          'useOutlines',
          'useThumbs',
          'fullScreen',
          'useOC',
          'useAttachments',
        ],
      },
      defaultValue: 'useNone',
    },
    pageLayout: {
      control: {
        type: ControlTypes.SELECT,
        options: [
          'singlePage',
          'oneColumn',
          'twoColumnLeft',
          'twoColumnRight',
          'twoPageLeft',
          'twoPageRight',
        ],
      },
      defaultValue: 'singlePage',
    },
  },
  [ComponentTypes.PAGE]: {
    size: {
      control: {
        type: ControlTypes.SELECT,
        options: [
          '4A0',
          '2A0',
          'A0',
          'A1',
          'A2',
          'A3',
          'A4',
          'A5',
          'A6',
          'A7',
          'A8',
          'A9',
          'A10',
          'B0',
          'B1',
          'B2',
          'B3',
          'B4',
          'B5',
          'B6',
          'B7',
          'B8',
          'B9',
          'B10',
          'C0',
          'C1',
          'C2',
          'C3',
          'C4',
          'C5',
          'C6',
          'C7',
          'C8',
          'C9',
          'C10',
          'RA0',
          'RA1',
          'RA2',
          'RA3',
          'RA4',
          'SRA0',
          'SRA1',
          'SRA2',
          'SRA3',
          'SRA4',
          'EXECUTIVE',
          'FOLIO',
          'LEGAL',
          'LETTER',
          'TABLOID',
          'ID1',
        ],
      },
      defaultValue: 'A4',
    },
    orientation: {
      control: {
        type: ControlTypes.SELECT,
        options: ['landscape', 'portrait'],
      },
      defaultValue: 'portrait',
    },
    wrap: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: true,
    },
    debug: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    bookmark: {
      control: {
        type: ControlTypes.TEXT, // or bookmark
      },
      defaultValue: '',
    },
  },
  [ComponentTypes.VIEW]: {
    wrap: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: true,
    },
    debug: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    fixed: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    bookmark: {
      control: {
        type: ControlTypes.TEXT, // or bookmark
      },
      defaultValue: '',
    },
  },
  [ComponentTypes.IMAGE]: {
    src: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
    debug: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    fixed: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    cache: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: true,
    },
    bookmark: {
      control: {
        type: ControlTypes.TEXT, // or bookmark
      },
      defaultValue: '',
    },
  },
  [ComponentTypes.TEXT]: {
    wrap: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: true,
    },
    debug: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    fixed: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    bookmark: {
      control: {
        type: ControlTypes.TEXT, // or bookmark
      },
      defaultValue: '',
    },
    stringChild: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
  },
  [ComponentTypes.LINK]: {
    src: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
    wrap: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: true,
    },
    debug: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    fixed: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    bookmark: {
      control: {
        type: ControlTypes.TEXT, // or bookmark
      },
      defaultValue: '',
    },
  },
  [ComponentTypes.NOTE]: {
    fixed: {
      control: {
        type: ControlTypes.BOOLEAN,
      },
      defaultValue: false,
    },
    children: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
  },
  [ComponentTypes.STRING]: {
    value: {
      control: {
        type: ControlTypes.TEXT,
      },
      defaultValue: '',
    },
  },
};
