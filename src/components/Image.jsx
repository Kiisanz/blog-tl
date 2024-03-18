export default function Image(props) {
  const url = "https://c.biztoc.com/p/5238cdf06d1b6018/s.webp";
  const { className } = props;
  return (
    <div>
      <img {...props} className={className} src={url} alt="" />
    </div>
  );
}
