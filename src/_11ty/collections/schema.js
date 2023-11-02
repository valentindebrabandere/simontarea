
module.exports = (collection) => {
  const itemsFile = collection.getFilteredByGlob("./src/content/schema/items.md")[0];

  if (!itemsFile || !itemsFile.data.items) {
    return [];
  }
  return itemsFile.data.items;
};
