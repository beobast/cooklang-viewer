export async function getRecipeImage(recipeFilePath: string | undefined) {
  if (!recipeFilePath) return null;

  // 1. List all images from recipes path
  let images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/recipes/**/*.{jpeg,jpg}",
  );

  console.log(Object.entries(images));

  // 2. Filter images by albumId
  images = Object.fromEntries(
    Object.entries(images).filter(([key]) => key.includes("mayo")),
  );

  // 3. Images are promises, so we need to resolve the glob promises
  /*const resolvedImages = await Promise.all(
    Object.values(images).map((image) => image().then((mod) => mod.default)),
  );*/

  // 4. Shuffle images in random order
  /*resolvedImages.sort(() => Math.random() - 0.5);
  return resolvedImages;*/
  return [];
}
