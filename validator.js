const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const checkRules = (element, rules) => {
    let result = false;
    let cause = '';
    
    return {result, cause}
}

exports.domValidation = (htmlText, structure, validations) => {
    /*
    Check HTML and validate contents.
    Return if the HTML is valid. Otherwise state violated rules.
    */
    const {document} = (new JSDOM(htmlText)).window;
        let results = [];
        // Check page structure. Elements given in the other of the 'querySelectorAll("*")' return
        let validStructure = true;
        let causeStructure = '';
        const {rootSelector, elementsList} = structure;
        const rootElement = document.querySelector(rootSelector);
        validStructure = rootElement? true: false;

        if(validStructure){
            // TODO: Use  document.querySelector("rootSelector").querySelectorAll("*")
            // to get all elements children and children of children given node in the HTML 
            const elementsInOrder = Array.from(rootElement.querySelectorAll("*"))
                                            .map( el => { return el.tagName.toLowerCase()});
            validStructure = elementsList.length === elementsList.filter(ele => elementsInOrder.includes(ele)).length
            causeStructure = validStructure? `Structure [${elementsInOrder}] follows given structure [${elementsList}]`
                                            : `Structure [${elementsInOrder}] doesn't follow given structure [${elementsList}]`;
            results.push({rootSelector, validStructure, causeStructure});
        } else {
            causeStructure = `Couldn't find selector ${rootSelector} to start checking HTML structure.`;
            results.push({rootSelector, validStructure, causeStructure});   
        }
        // Check validations
        for(let validation of validations){
            try {
                let valid = true;
                let cause = '';
                const {selector = '*', expectedValues = []} = validation;                
                const elements = Array.from(document.querySelectorAll(selector));
      
                if (valid && expectedValues.length > 0) {
                    for(let element of elements){
                        // TODO: Check expected values in each element, push to results validation
                        for(let rule of expectedValues){
                            const {attribute, value} = rule;
                            let elementAttribute = '';
                            let valid = true;
                            if (attribute === 'innerHTML'){
                                elementAttribute = element[attribute];
                            } else {
                                elementAttribute = element.getAttribute(attribute);
                                valid = elementAttribute === value;
                            }
                            if (attribute === 'class') {
                                // Compare value (list) with intersection of attribute class parsed as list and value (list)
                                elementAttribute = elementAttribute.split(' ');
                                valid = value.length === value.filter(ele => elementAttribute.includes(ele)).length;
                            }
                            cause = valid ? `Element '${selector}': attribute '${attribute}' has value '${value}'`: `Element '${selector}': attribute '${attribute}' has value '${elementAttribute}' instead of '${value}'`;
                            results.push({selector, valid, cause});
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