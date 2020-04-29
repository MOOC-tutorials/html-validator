const {domValidation} = require('./validator.js');

module.exports = (app) => {
  // index route
  app.get('/', (req, res) => {
    res.json({"version": '0.0.1', name:"html-validator"});
  });
  
  app.post('/', (req, res) => {
    /* TODO: Body should have:
     {  content: "encoded html in base64",
        validations: [
          { selector: ,
            numberOfElements: ,
            expectedValues: [
              [{attribute: ,
               value: },
               {attribute: ,
               value: },..],
               [{attribute: ,
               value: },
               {attribute: ,
               value: },..],.. expected values elements selected should have
              ]
          }
        ]
    */
    const {body:{content, validations}} = req;
    const htmlText = Buffer.from(content, 'base64');
    const result = domValidation(htmlText, validations);
    res.json(result);
  });
};