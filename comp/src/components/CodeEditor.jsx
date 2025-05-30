// src/components/CodeEditor.jsx
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { c } from '@codemirror/lang-c';
import { go } from '@codemirror/lang-go';
import { dracula } from '@codemirror/theme-dracula';

const languageMap = {
  cpp: cpp(),
  python3: python(),
  java: java(),
  c: c(),
  go: go(),
};

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <CodeMirror
      value={code}
      height="300px"
      extensions={[languageMap[language] || cpp()]}
      theme={dracula}
      onChange={(value) => setCode(value)}
    />
  );
};

export default CodeEditor;
