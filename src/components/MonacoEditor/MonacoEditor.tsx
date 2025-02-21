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

const MonacoEditor: React.FC<IMonacoEditor> = ({ setValue, value }) => {
  const { handleEditContent } = useBooks();
  const handleEditorChange: OnChange = (value, _) => {
    if (value) {
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
