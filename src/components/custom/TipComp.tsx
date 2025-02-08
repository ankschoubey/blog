interface TipProps {
  content: string;
  children: any;
  bgColor: string;
  link?: string;
}

const Tip: React.FC<TipProps> = ({ bgColor, content, link, children }) => {
  let classes = bgColor + ' text-black rounded-lg p-2 flex justify-center items-center gap-3 ';
  if (link) {
    classes += ' cursor-pointer';
  }
  return (
    <div className={classes}>
      <div className="text-xl">{children}</div>
      <div className="text-base" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default Tip;
