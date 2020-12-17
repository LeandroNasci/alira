import convert, { ElementCompact } from 'xml-js';

export default function createXml (json: ElementCompact) {
  return convert.js2xml(json, { compact: true, spaces: 2 } );
};
