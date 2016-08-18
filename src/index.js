var MarkupIt = require('markup-it');
var markdownSyntax = require('markup-it/syntaxes/markdown');
var htmlSyntax = require('markup-it/syntaxes/html');

var markdown = new MarkupIt(markdownSyntax);
var html = new MarkupIt(htmlSyntax);

function parseMarkdown (text) {
  md = markdown.toContent(text);
  parsed = html.toText(md);
  return parsed;
};

function blockFilter (imageItem) {
  var image = imageItem.trim()
  return image.length > 1;
}

function flexWrap (block, position) {
  var blockText, images, figures = [];

  blockText = block.body.split(/\r?\n/);
  images = blockText.filter(blockFilter);

  images.forEach(function(img) {
    var inner = parseMarkdown(img.trim()).replace(/<p>|<\/p>/g, "")
    figures.push(
      '<div>'
      + inner
      + '</div>');
  });

  var body = ('<div class="figure-block">'
  + figures.join('\n')
  + '</div>');

  return {
    body: body,
    parse: true
  };
}

module.exports = {
  website: {
    assets: './assets',
    css: [ 'plugin.css' ]
  },
  ebook: {
    assets: './assets',
    css: [ 'plugin.css' ]
  },
  blocks: {
    fleximages: {
      process: function(block) {
        return flexWrap(block)
      }
    }
  }
};
