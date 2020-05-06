const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const checkRules = (element, rules) => {
    let result = false;
    let cause = '';
    
    return {result, cause}
}

exports.domValidation = (htmlText, validations) => {
    /*
    Check HTML and validate contents.
    Return if the HTML is valid. Otherwise state violated rules.
    */
    const {document} = (new JSDOM(htmlText)).window;
        let results = [];
        for(let validation of validations){
            try {
                let valid = true;
                let cause = '';
                const {selector, numberOfElements = 1, expectedValues = []} = validation;
                
                if(numberOfElements <= 0){
                    const element = document.querySelector(selector);
                    valid = element == null;
                    cause = valid ? `Element with selector '${selector}' doesn't exists`: `Element with selector '${selector}' exists.`;
                    results.push({selector, valid, cause});
                } else {
                    const elements = Array.from(document.querySelectorAll(selector));
                    valid = elements.length == numberOfElements;
                    cause = valid ? `Number of elements found (${elements.length}) matches expected number ${numberOfElements}.`: `Number of elements found was ${elements.length} instead of ${numberOfElements}.`;
                    results.push({selector, valid, cause});
                    
                    if (valid && expectedValues.length > 0) {
                        for(let element of elements){
                            // TODO: Check expected values in each element, push to results validation
                            for(let rule of expectedValues){
                                const {attribute, value} = rule;
                                let elementAttribute = '';
                                if (attribute == 'innerHTML'){
                                  elementAttribute = element[attribute];
                                } else {
                                  elementAttribute = element.getAttribute(attribute);
                                }
                                const valid = elementAttribute == value;
                                const cause = valid ? `Element '${selector}': attribute '${attribute}' has value '${value}'`: `Element '${selector}': attribute '${attribute}' has value '${elementAttribute}' instead of '${value}'`;
                                results.push({selector, valid, cause});
                            }
                        }
                    }                         
                }
            } catch(err){
                console.log(err);
                return {
                    valid: false,
                    cause: err.toString()};
              }
        }
        return results;
}