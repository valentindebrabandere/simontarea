// src/_11ty/collections/schema.js

module.exports = (collection) => {
  const itemsFile = collection.getFilteredByGlob("./src/content/schema/schema__items.md")[0];
  if (!itemsFile || !itemsFile.data.items) {
    return {
      schema__bigItems: [],
      schema__smallItems: []
    };
  }

  const schema__bigItems = itemsFile.data.items.filter(item => item.big);
  const schema__smallItems = itemsFile.data.items.filter(item => !item.big);

  return {
    schema__bigItems,
    schema__smallItems
  };
};
