module.exports = function (str) {
  return str.replace(/\(\(/g, "<span>").replace(/\)\)/g, "</span>");
};
