import "./Case.css";

const Case = ({ title, director, link, onHover }: CaseProps) => {
  return (
    <p className="case" onMouseEnter={onHover}>
        <span className="title">{title}</span>
        <span className="separator">&nbsp; - &nbsp;</span>
        <span className="director">{director}</span>
    </p>
  );
}

export default Case;