import XMLDom from 'xmldom';

import { RDF_DEFAULT_NAMESPACE } from 'const';
import BaseScanner from 'scanners/base';
import { RDFParseError } from 'exceptions';
import * as rules from 'rules/rdf';


export default class RDFScanner extends BaseScanner {

  _defaultRules = rules;

  constructor(contents, filename) {
    super(contents, filename);
    // I don't think this ever needs to be different, but if it does we can
    // extract the em namespace using:
    //
    //     this.namespace = this._xmlDoc.documentElement._nsMap.em;
    //
    // Inside _getContents.
    this.options.namespace = RDF_DEFAULT_NAMESPACE;
  }

  _getContents() {
    return new Promise((resolve, reject) => {
      var xmlDoc = new XMLDom.DOMParser({
        errorHandler: (err) => {
          reject(new RDFParseError(`RDF Parse Error: ${err}`));
        },
      }).parseFromString(this.contents, 'text/xml');

      resolve(xmlDoc);
    });
  }
}
