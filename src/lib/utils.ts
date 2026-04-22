// https://jankraus.net/2024/04/05/how-to-build-a-simple-photo-gallery-with-astro/
export async function getRecipeImage(recipeFilePath: string | undefined) {
  if (recipeFilePath === undefined) return null;

  // 1. List all images from recipes path
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/recipes/**/*.{jpeg,jpg,png}",
  );

  // 2. Find recipe image
  // Remove file extension from image path then compare with recipeFilePath
  const image = Object.entries(images).find((image) =>
    recipeFilePath.includes(image[0].replace(/\.[^/.]+$/, "")),
  );

  if (image === undefined) return null;

  // 3. Resolve image promise and return ImageMetadata
  return await image[1]().then((mod) => mod.default);
}
