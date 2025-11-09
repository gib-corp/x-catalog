import "./Case.css";

function Case({ title, source, link }: CaseProps) {
  return (
    <p className="case">
        <span className="title">{title}</span>
        <span className="separator">&nbsp; - &nbsp;</span>
        <span className="source">{source}</span>
    </p>
  );
}

export default Case;