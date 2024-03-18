export default function CloudTag(props) {
  const { className, text } = props;
  return (
    <div>
      <div
        {...className}
        className="items-center flex-none block px-3 py-1 text-xs leading-none text-white bg-yellow-600 rounded-xl"
      >
        {text}
      </div>
    </div>
  );
}
