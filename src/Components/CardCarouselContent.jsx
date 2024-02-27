const CardCarouselContent = ({ title, contentText }) => {
  return (
    <div className=" bg-sky-700 backdrop-blur-2xl">
      <h5 className="text-xl ">{title}</h5>
      <p>{contentText}</p>
    </div>
  );
};
export default CardCarouselContent;
