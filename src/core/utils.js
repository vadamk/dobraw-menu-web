export const getDishThumbnailURL = (dish, size = "medium") => {
  return (dish.thumbnail.formats[size] || dish.thumbnail.formats.small).url
}
