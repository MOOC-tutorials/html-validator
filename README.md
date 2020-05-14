HTML Validator
========================

This app is a building block to validate HTML by providing custom rules

## Getting set up
* Node 12.16.x

## View the Code
On the back-end,
- The app starts at `server.js`
- Frameworks and packages are in `package.json`
- App config is stored in `.env`

## Example petition:

Send a post request to [here](https://html-validator.glitch.me) with a body similar to the one below (the `content` element is the `base64` encoded HTML string, `validations` are related with: (1) Number of expected elements by selector; (2) Attributes and corresponding values to check).

### Example HTML

```html
<HTML>

<HEAD>

<TITLE>Your Title Here</TITLE>

</HEAD>

<BODY BGCOLOR="FFFFFF" color="black" class="first-class second-class thrid-class">

<CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"> </CENTER>

<HR>

<a href="http://somegreatsite.com">Link Name</a>

is a link to another nifty site

<H1>This is a Header</H1>

<H2>This is a Medium Header</H2>

Send me mail at <a href="mailto:support@yourcompany.com">

support@yourcompany.com</a>.

<P> This is a new paragraph!

</P> <B>This is a new paragraph!</B>

<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>

<HR>

</BODY>

</HTML>

```

### JSON request body
```json
{ "content": "PEhUTUw+Cgo8SEVBRD4KCjxUSVRMRT5Zb3VyIFRpdGxlIEhlcmU8L1RJVExFPgoKPC9IRUFEPgoKPEJPRFkgQkdDT0xPUj0iRkZGRkZGIiBjb2xvcj0iYmxhY2siIGNsYXNzPSJmaXJzdC1jbGFzcyBzZWNvbmQtY2xhc3MgdGhyaWQtY2xhc3MiPgoKPENFTlRFUj48SU1HIFNSQz0iY2xvdWRzLmpwZyIgQUxJR049IkJPVFRPTSI+IDwvQ0VOVEVSPgoKPEhSPgoKPGEgaHJlZj0iaHR0cDovL3NvbWVncmVhdHNpdGUuY29tIj5MaW5rIE5hbWU8L2E+CgppcyBhIGxpbmsgdG8gYW5vdGhlciBuaWZ0eSBzaXRlCgo8SDE+VGhpcyBpcyBhIEhlYWRlcjwvSDE+Cgo8SDI+VGhpcyBpcyBhIE1lZGl1bSBIZWFkZXI8L0gyPgoKU2VuZCBtZSBtYWlsIGF0IDxhIGhyZWY9Im1haWx0bzpzdXBwb3J0QHlvdXJjb21wYW55LmNvbSI+CgpzdXBwb3J0QHlvdXJjb21wYW55LmNvbTwvYT4uCgo8UD4gVGhpcyBpcyBhIG5ldyBwYXJhZ3JhcGghCgo8L1A+IDxCPlRoaXMgaXMgYSBuZXcgcGFyYWdyYXBoITwvQj4KCjxCUj4gPEI+PEk+VGhpcyBpcyBhIG5ldyBzZW50ZW5jZSB3aXRob3V0IGEgcGFyYWdyYXBoIGJyZWFrLCBpbiBib2xkIGl0YWxpY3MuPC9JPjwvQj4KCjxIUj4KCjwvQk9EWT4KCjwvSFRNTD4=",
  "structureValidation": {
	"rootSelector": "body",
  	"elementsList": ["center", "img", "hr", "a", "h1", "h2", "a", "p", "b", "br", "b", "i", "hr"]
  },
  "valueValidations": [
	  	{
	  		"selector": "body",
	  		"expectedValues": [
	  			{ 
	  			  "attribute": "bgcolor",
	  			  "value": "FFFFFF"
	  			},
	  			{
	  			  "attribute": "color",
	  			  "value": "black"
	  			},
	  			{ 
	  			  "attribute": "class",
	  			  "value": ["first-class", "second-class"]
	  			}
	  		]
	  	},
	  	{
	  		"selector": "a",
	  		"expectedValues": [
	  			{
	  				"attribute": "href",
		  			"value": "http://somegreatsite.com"}
	  		]
	  	}
  	]
}


```

### Result

```json
[
    {
        "rootSelector": "body",
        "validStructure": true,
        "causeStructure": "Structure [center,img,hr,a,h1,h2,a,p,b,br,b,i,hr] follows given structure [center,img,hr,a,h1,h2,a,p,b,br,b,i,hr]"
    },
    {
        "selector": "body",
        "valid": true,
        "cause": "Element 'body': attribute 'bgcolor' has value 'FFFFFF'"
    },
    {
        "selector": "body",
        "valid": true,
        "cause": "Element 'body': attribute 'color' has value 'black'"
    },
    {
        "selector": "body",
        "valid": true,
        "cause": "Element 'body': attribute 'class' has value 'first-class,second-class'"
    },
    {
        "selector": "a",
        "valid": true,
        "cause": "Element 'a': attribute 'href' has value 'http://somegreatsite.com'"
    },
    {
        "selector": "a",
        "valid": false,
        "cause": "Element 'a': attribute 'href' has value 'mailto:support@yourcompany.com' instead of 'http://somegreatsite.com'"
    }
]
```

## TODO

* Manage to check specific number of matches instead of checking any element.