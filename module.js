const { ModuleKind, isExportSpecifier } = require("typescript");

const hello = 'module';

// module.exports = hello;
// exports.a = 'b';
// exports.b = false;
// module.exports = {
//   a: 'b',
//   b: false,
// };

const a = 'b';
const b = false;

export { a };
export { b };

export default function() {
  
}