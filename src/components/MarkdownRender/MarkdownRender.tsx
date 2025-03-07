import Markdown from '../Markdown/Markdown';

interface IMarkdownRender {
  value: string | undefined;
}

const MarkdownRender: React.FC<IMarkdownRender> = ({ value }) => {
  return (
    <div
      className="lg:h-[75vh] h-[40rem] w-auto flex-1 overflow-y-auto border-4 border-zinc-800 bg-zinc-800 p-4 rounded-sm flex flex-col"
      id="markdown"
    >
      <Markdown content={value || ''} />
    </div>
  );
};

export default MarkdownRender;
