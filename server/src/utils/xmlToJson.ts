import convert from 'xml-js';

const xmlToJson = (xml: string) => {
  return convert.xml2js(xml, { compact: true } );
}

export default xmlToJson;
