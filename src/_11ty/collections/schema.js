// src/_11ty/collections/schema.js

function formatToPath(name) {
  return name
    .normalize("NFD") // Normalize the string
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^a-z0-9\-]/g, ''); // Remove invalid characters
}

module.exports = (collection) => {
  const itemsFile = collection.getFilteredByGlob("./src/content/schema/schema__items.md")[0];

  if (!itemsFile || !itemsFile.data.items) {
    return {
      schema__bigItems: [],
      schema__smallItems: []
    };
  }
  
  const processItems = (items) => items.map(item => {
    const basePath = '/assets/img/schema/item-icons/';
    if (!item.icon) {
      // Use formatted name if icon is null
      item.icon = `${basePath}${formatToPath(item.name)}.png`;
    } else if (!item.icon.startsWith(basePath)) {
      // Prepend the path and append .png extension if not already done
      item.icon = `${basePath}${item.icon}.png`;
    }
    return item;
  });

  const schema__bigItems = processItems(itemsFile.data.items.filter(item => item.big));
  const schema__smallItems = processItems(itemsFile.data.items.filter(item => !item.big));

  return {
    schema__bigItems,
    schema__smallItems
  };
};

