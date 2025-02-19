import Markdown from '../Markdown/Markdown';

interface IMarkdownRender {
  value: string | undefined;
}

const MarkdownRender: React.FC<IMarkdownRender> = ({ value }) => {
  return (
    <div className="lg:h-[80vh] h-[45rem] w-auto overflow-y-scroll flex-1 m-2 border-8 border-zinc-800 p-4 rounded-sm">
      <Markdown content={value || ''} />
    </div>
  );
};

export default MarkdownRender;
