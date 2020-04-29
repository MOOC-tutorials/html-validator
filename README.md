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

<BODY BGCOLOR="FFFFFF" color="black">

<CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"> </CENTER>

<HR>

<a href="http://somegreatsite.com">Link Name</a>

is a link to another nifty site

<H1>This is a Header</H1>

<H2>This is a Medium Header</H2>

Send me mail at <a href="mailto:support@yourcompany.com">

support@yourcompany.com</a>.

<P> This is a new paragraph!

<P> <B>This is a new paragraph!</B>

<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>

<HR>

</BODY>

</HTML>

```

### JSON request body
```json
{ "content": "PEhUTUw+Cgo8SEVBRD4KCjxUSVRMRT5Zb3VyIFRpdGxlIEhlcmU8L1RJVExFPgoKPC9IRUFEPgoKPEJPRFkgQkdDT0xPUj0iRkZGRkZGIiBjb2xvcj0iYmxhY2siPgoKPENFTlRFUj48SU1HIFNSQz0iY2xvdWRzLmpwZyIgQUxJR049IkJPVFRPTSI+IDwvQ0VOVEVSPgoKPEhSPgoKPGEgaHJlZj0iaHR0cDovL3NvbWVncmVhdHNpdGUuY29tIj5MaW5rIE5hbWU8L2E+CgppcyBhIGxpbmsgdG8gYW5vdGhlciBuaWZ0eSBzaXRlCgo8SDE+VGhpcyBpcyBhIEhlYWRlcjwvSDE+Cgo8SDI+VGhpcyBpcyBhIE1lZGl1bSBIZWFkZXI8L0gyPgoKU2VuZCBtZSBtYWlsIGF0IDxhIGhyZWY9Im1haWx0bzpzdXBwb3J0QHlvdXJjb21wYW55LmNvbSI+CgpzdXBwb3J0QHlvdXJjb21wYW55LmNvbTwvYT4uCgo8UD4gVGhpcyBpcyBhIG5ldyBwYXJhZ3JhcGghCgo8UD4gPEI+VGhpcyBpcyBhIG5ldyBwYXJhZ3JhcGghPC9CPgoKPEJSPiA8Qj48ST5UaGlzIGlzIGEgbmV3IHNlbnRlbmNlIHdpdGhvdXQgYSBwYXJhZ3JhcGggYnJlYWssIGluIGJvbGQgaXRhbGljcy48L0k+PC9CPgoKPEhSPgoKPC9CT0RZPgoKPC9IVE1MPg==",
  "validations": [
	  	{
	  		"selector": "body",
	  		"numberOfElements": 1,
	  		"expectedValues": [
	  			{ 
	  			  "attribute": "bgcolor",
	  			  "value": "FFFFFF"
	  			},
	  			{
	  			  "attribute": "color",
	  			  "value": "black"
	  			}
	  		]
	  	},
	  	{
	  		"selector": "p",
	  		"numberOfElements": 2
	  	},
	  	{
	  		"selector": "a",
	  		"numberOfElements": 0,
	  		"expectedValues": [
	  			{
	  				"attribute": "href",
		  			"value": "http://somegreatsite.com"},
	  			{
	  				"attribute": "href",
		  			"value": "mailto:support@yourcompany.com"
	  			}
	  		]
	  	},
	  	{
	  		"selector": "a",
	  		"numberOfElements": 2,
	  		"expectedValues": [
	  			{
	  				"attribute": "href",
		  			"value": "http://somegreatsite.com",
		  			"matches": 1
	  			},
	  			{
	  				"attribute": "href",
		  			"value": "mailto:support@yourcompany.com",
		  			"matches": 1
	  			}
	  		]
	  	}
  	]
}
```

### Result

```json
[
    {
        "selector": "body",
        "valid": true,
        "cause": "Number of elements found (1) matches expected number 1."
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
        "selector": "p",
        "valid": true,
        "cause": "Number of elements found (2) matches expected number 2."
    },
    {
        "selector": "a",
        "valid": false,
        "cause": "Element with selector 'a' exists."
    },
    {
        "selector": "a",
        "valid": true,
        "cause": "Number of elements found (2) matches expected number 2."
    },
    {
        "selector": "a",
        "valid": true,
        "cause": "Element 'a': attribute 'href' has value 'http://somegreatsite.com'"
    },
    {
        "selector": "a",
        "valid": false,
        "cause": "Element 'a': attribute 'href' has value 'http://somegreatsite.com' instead of 'mailto:support@yourcompany.com'"
    },
    {
        "selector": "a",
        "valid": false,
        "cause": "Element 'a': attribute 'href' has value 'mailto:support@yourcompany.com' instead of 'http://somegreatsite.com'"
    },
    {
        "selector": "a",
        "valid": true,
        "cause": "Element 'a': attribute 'href' has value 'mailto:support@yourcompany.com'"
    }
]
```

## TODO

* Manage to check specific number of matches instead of checking any element.