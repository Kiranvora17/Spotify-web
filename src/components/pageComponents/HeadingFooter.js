const HeadingFooter = (props) => {
  return (
    <p>
      {props.items.map((item, index, array) => (
        <span key={item}>
          {item}
          {index !== array.length - 1 ? "." : null}
        </span>
      ))}
    </p>
  );
};

export default HeadingFooter;
