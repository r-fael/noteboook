import Editor, { OnChange } from '@monaco-editor/react';
import useBooks from '../../hooks/useBooks';
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
  '/list': '- ',
  '/title1': '# **title**',
  '/title2': '## **title**',
  '/title3': '### **title**',
  '/title4': '#### **title**',
  '/title5': '##### **title**',
  '/title6': '###### **title**',
  '/link': "[text](<link> '<title>')",
  '/table': `|           |           |           |
|:---------:|:---------:|:---------:|
|           |           |           |
|           |           |           |
`,
  '/image': '![text](<link>)',
};

const MonacoEditor: React.FC<IMonacoEditor> = ({ setValue, value }) => {
  const { handleEditContent } = useBooks();

  const applyCommand = (lines: string[], commandLine: number) => {
    let command: string = lines[commandLine].trim();
    //@ts-ignore
    lines.splice(commandLine, 1, commands[command]);
    return lines.join('');
  };

  const handleEditorChange: OnChange = (value, event) => {
    if (value != undefined) {
      const lines = value.split('\n');
      if (event.changes[0].text.includes('\n')) {
        const line = event.changes[0].range.startLineNumber - 1;
        const command = lines[line].replace('\r', '').replace('\n', '');
        if (Object.keys(commands).includes(command)) {
          value = applyCommand(lines, line);
        }
      }
      setValue(value);
      handleEditContent(value);
    }
  };

  return (
    <div className="lg:h-[75vh] h-[40rem] lg:w-[40vw] w-auto border-4 border-zinc-800 rounded-sm">
      <Editor
        width="auto"
        height="100%"
        onChange={handleEditorChange}
        theme="vs-dark"
        language="markdown"
        options={options}
        value={value || ''}
      />
    </div>
  );
};

export default MonacoEditor;
