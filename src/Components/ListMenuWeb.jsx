const ListMenuWeb = (props) => {
  const { option, currentPage } = props;
  const handleClick = () => {
    const targetSection = document.getElementById(
      option.toLowerCase().replace(" ", "-")
    );
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const menuItemClass =
    currentPage === option
      ? "p-4 hover:bg-sky-400 border-b-4 border-indigo-800 outline-2  md:font-bold text-indigo-800 md:text-lg"
      : "p-4 hover:bg-sky-400 border-b-4 border-slate-400 outline-2 md:font-bold md:text-lg";
  return (
    <li className={menuItemClass} onClick={handleClick}>
      {option}
    </li>
  );
};

export default ListMenuWeb;
