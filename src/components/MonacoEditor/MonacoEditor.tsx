import Editor, { OnChange } from '@monaco-editor/react';

interface IMonacoEditor {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  value: string | undefined;
}

const options = {
  readOnly: false,
  minimap: { enabled: false },
};

const MonacoEditor: React.FC<IMonacoEditor> = ({ setValue, value }) => {
  const handleEditorChange: OnChange = (value, _) => {
    setValue(value);
  };

  return (
    <div className="m-2 lg:h-[80vh] h-[40rem] lg:w-[40vw] w-auto border-4 border-zinc-800 rounded-sm">
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
