export const share = async ({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) => {
  return navigator
    .share({
      title,
      text,
      url,
    })
    .catch((err) => console.error(err));
};
