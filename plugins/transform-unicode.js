module.exports = function({ types: t }) {
    return {
      visitor: {
        StringLiteral(path) {
          if (path.node.value.match(/\\u[0-9A-Fa-f]{4}/)) {
            path.node.value = path.node.value.replace(/\\u([0-9A-Fa-f]{4})/g, (match, p1) => {
              return String.fromCharCode(parseInt(p1, 16));
            });
          }
        }
      }
    };
  };
  