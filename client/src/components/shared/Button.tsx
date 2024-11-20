type TProps = {
  text: string;
  onClick: () => void;
};
export default function Button({ onClick, text }: TProps) {
  return (
    <button
      type="button"
      className="border border-solid border-white px-2 py-1 m-2 rounded-lg bg-blue-800 hover:bg-green-900 duration-150 relative active:top-0.5 active:left-0.5"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
