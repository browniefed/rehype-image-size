"use strict";

const visit = require("unist-util-visit");
const size = require("image-size");

module.exports = attacher;

function attacher({ resolvePath }) {
  function transform(tree) {
    function visitor(node) {
      const {
        tagName,
        properties: { src },
      } = node;

      if (tagName !== "img" || typeof src !== "string") return;
      const absolutePath = resolvePath(src);
      const imgSize = size(absolutePath);
      node.properties.width = imgSize.width;
      node.properties.height = imgSize.height;
    }

    visit(tree, ["element"], visitor);
  }

  return transform;
}
