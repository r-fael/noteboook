import Markdown from '../Markdown/Markdown';

interface IMarkdownRender {
  value: string | undefined;
}

const MarkdownRender: React.FC<IMarkdownRender> = ({ value }) => {
  return (
    <div className="lg:h-[75vh] h-[40rem] w-auto overflow-y-scroll flex-1 border-4 border-zinc-800 p-4 rounded-sm">
      <Markdown content={value || ''} />
    </div>
  );
};

export default MarkdownRender;
