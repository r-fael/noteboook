import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import useBooks from '../../hooks/useBooks';
import prettier from 'prettier';
import * as markdownPlugin from 'prettier/plugins/markdown.js';
import useKey from '../../hooks/useKey';
import { useEffect, useRef, useState } from 'react';
interface IMonacoEditor {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  value: string | undefined;
}

const options = {
  readOnly: false,
  minimap: { enabled: false },
};

const commands = {
  '/ch': '- [ ] ',
  '/h1': '# **title**',
  '/h2': '## **title**',
  '/h3': '### **title**',
  '/h4': '#### **title**',
  '/h5': '##### **title**',
  '/h6': '###### **title**',
  '/a': "[text](<link> '<title>')",
  '/th': `|           |           |           |\n|:---------:|:---------:|:---------:|`,
  '/tr': '|           |           |           |',
  '/img': '![text](<link>)',
};

const MonacoEditor: React.FC<IMonacoEditor> = ({ setValue, value }) => {
  const { handleEditContent, selectedPage } = useBooks();
  const [hasToFocus, setHasToFocus] = useState<boolean>(false);
  const [focusLine, setFocusLine] = useState<number>(-1);
  const [render, setRender] = useState<number>(0);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef?.current != null) {
      setRender((o) => (o === 1 ? o + 1 : o - 1));
    }
  }, [selectedPage]);

  useEffect(() => {
    if (hasToFocus && focusLine !== -1) {
      changeFocusLine(focusLine);
      setFocusLine(-1);
      setHasToFocus(false);
    }
  }, [value]);

  const handleEditorMount: OnMount = (editor, _) => {
    editorRef.current = editor;
  };

  const changeFocusLine = (lineNumber: number) => {
    if (editorRef.current) {
      const maxColumn = editorRef.current
        .getModel()
        .getLineMaxColumn(lineNumber);

      editorRef.current.setPosition({ lineNumber, column: maxColumn });
      editorRef.current.revealLineInCenter(lineNumber);
      editorRef.current.focus();
    }
  };

  const format = async (e: KeyboardEvent) => {
    e.preventDefault();
    if (value) {
      const formatedValue = await prettier.format(value, {
        parser: 'markdown',
        proseWrap: 'always',
        tabWidth: 2,
        plugins: [markdownPlugin],
      });
      //@ts-ignore
      handleEditorChange(formatedValue, undefined);
    }
  };

  useKey('ctrls', format);

  const applyCommand = (lines: string[], commandLine: number) => {
    let command: string = lines[commandLine].trim();
    if (lines.every((l) => !l.endsWith('\n'))) {
      lines = lines.map((l) => l + '\n');
    }
    //@ts-ignore
    lines.splice(commandLine, 1, commands[command]);
    return lines.join('');
  };

  const addCheckBox = (lines: string[], commandLine: number) => {
    if (lines.every((l) => !l.endsWith('\n'))) {
      lines = lines.map((l, i) => (i == lines.length - 1 ? l : l + '\n'));
    }
    //@ts-ignore
    lines.splice(commandLine + 1, 0, '- [ ] ');
    return lines.join('');
  };

  const handleEditorChange: OnChange = (value, event) => {
    let line = -1;
    if (value != undefined) {
      if (['\n', '\r\n'].includes(event?.changes[0].text)) {
        const lines = value.split('\n');
        line = event.changes[0].range.startLineNumber - 1;
        let command = lines[line].replace('\r', '').replace('\n', '');
        command = command.toLocaleLowerCase();
        if (Object.keys(commands).includes(command)) {
          value = applyCommand(lines, line);
          setFocusLine(line + 1);
        } else if (
          command.startsWith('- [ ] ') ||
          command.startsWith('- [x] ')
        ) {
          value = addCheckBox(lines, line);
          setFocusLine(line + 2);
        }
      }

      if (line !== -1) {
        setHasToFocus(true);
      }

      setValue(value);
      handleEditContent(value);
    }
  };

  return (
    <div className="lg:h-[75vh] h-[40rem] lg:w-[40vw] w-auto border-4 border-zinc-800 bg-zinc-800 rounded-sm">
      <Editor
        width="auto"
        height="100%"
        key={render}
        onChange={handleEditorChange}
        theme="vs-dark"
        language="markdown"
        onMount={handleEditorMount}
        options={options}
        value={value || ''}
      />
    </div>
  );
};

export default MonacoEditor;
