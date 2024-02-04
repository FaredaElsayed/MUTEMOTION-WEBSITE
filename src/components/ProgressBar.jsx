function MyProgressBar({ interval }) {
  const customProgressBarStyle = {
    width: "100%",
    
  };
  const max = interval;

  return (
    <progress value={50} max={max} style={customProgressBarStyle}></progress>
  );
}

export default MyProgressBar;
