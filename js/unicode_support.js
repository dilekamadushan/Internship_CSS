var theform;
var textfield;
var d3,d2;
var digits;

//---------------------
function insert (d1d0) 
{
    // eval("textfield.value += \"\\u"+d3+d2+d1d0+"\"");
    eval("insertAtCursor(textfield,\"\\u"+d3+d2+d1d0+"\")");
    textfield.focus();
}

//---------------------
// The function insertAtCursor is modified version of code from
// PHPMyAdmin.  PHPMyAdmin is GPLed, so copyright for this is fine.
//
// (IE and Mozilla code both modified to leave cursor position correct after
//  insert.)
//
function insertAtCursor(myField, myValue)
{
  //IE support
  if (document.selection)
  {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
  }
  //MOZILLA/NETSCAPE support
  else if (myField.selectionStart || myField.selectionStart == '0')
  {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      var newEndPos = startPos + myValue.length;
      myField.value = myField.value.substring(0, startPos)
                      + myValue 
                      + myField.value.substring(endPos, myField.value.length);
      myField.setSelectionRange(newEndPos, newEndPos);
  }
  else 
  {
      var newEndPos = myField.value.length + myValue.length;
      myField.value += myValue;
      myField.setSelectionRange(newEndPos, newEndPos);
  }
}

//---------------------
function initSection()
{
    // assumes d2, d3 already set
    var ctrl;
    for (var v1=0; v1 < 16; v1++)
    {
	d1=digits[v1];
	ctrl=(d3==0 && d2==0 && d1<=1);
	for (var v0=0; v0 < 16; v0++)
	{
	    d0=digits[v0];
	    if (!ctrl)
	    {
		eval("theform.c"+d1+d0+".value=\"\\u"+d3+d2+d1+d0+"\"");
	    }
	    else
	    {
		eval("theform.c"+d1+d0+".value=\"[]\"");
	    }
	}
    }
    textfield.focus();
}

//---------------------
function selectOption(obj,reqdvalue,defaultindex)
{
    var found=0;
    for (var opt=0; opt<obj.options.length;opt++)
    {
	if(obj.options[opt].value==reqdvalue)
	{
	    found=1;
	    obj.selectedIndex=opt;
	    break;
	}
    }
    if (!found && defaultindex>=0)
    {
	obj.selectedIndex=defaultindex;
    }
}

//---------------------
function valueSelected(obj)
{
    return obj.options[obj.selectedIndex].value;
}

//---------------------
function initSectionFromNumeric()
{
    d3=valueSelected(theform.d3);
    d2=valueSelected(theform.d2);
    selectOption(theform.list,d3+d2,0);
    initSection();
}

//---------------------
function initSectionFromList() 
{
    var d3d2=valueSelected(theform.list);
    if (d3d2=='none'){return}
    d3=d3d2.charAt(0);
    d2=d3d2.charAt(1);
    selectOption(theform.d3,d3,-1);
    selectOption(theform.d2,d2,-1);
    initSection();
}

//---------------------
function clearInput() 
{
    // use this function because reset button resets too many things
    textfield.value="";
    htmlfield.value="";
    textfield.focus();
}

//---------------------
function setup()
{
    digits=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
    lcdigits=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    theform = document.mainform
    textfield = theform.myinput;
    htmlfield = theform.html;
    initSectionFromNumeric();
}

//---------------------
function hex(n)
{
    return "%"+lcdigits[n>>4]+lcdigits[n&15];
}

//---------------------
function utf8(text) 
{
    // NB this function is valid up to uFFFF; would need extending
    // for >2 byte characters 
    var enc = "";
    for(var pos=0; pos<text.length; pos++)
    {
        var c=text.charCodeAt(pos);
	if (c<128)
	{
	    enc += escape(text.charAt(pos));
	}
	else if(c<2048)
	{
	    enc += hex((c>>6)|192);
	    enc += hex((c&63)|128);
	}
	else
	{
	    enc += hex((c>>12)|224);
	    enc += hex(((c>>6)&63)|128);
	    enc += hex((c&63)|128);
	}
    }
    return enc;
}

//---------------------
function html(text) 
{
    var enc = "";
    for(var pos=0; pos<text.length; pos++)
    {
        var c=text.charCodeAt(pos);
	if (c==60){
	    enc += "&lt;";
	}
	else if (c==62) {
	    enc += "&gt;";
	}
	else if (c==38) {
	    enc += "&amp;";
	}
	else if (c>=32 && c<128)
	{
	    enc += text.charAt(pos);
	}
	else
	{
	    enc += "&#"+c+";";
	}
    }
    return enc;
}

//---------------------
function copyToClipboard()
{
    var range;
    if (document.selection)
    {
	textfield.focus();
	textfield.select();
	range=textfield.createTextRange();
	range.execCommand("Copy");
    }
}

//---------------------
function htmlify()
{
    htmlfield.value=html(textfield.value);
    textfield.focus();
}

//---------------------
function google()
{
    window.open("http://www.google.com/search?q="+utf8(textfield.value)+"&ie=UTF-8&oe=UTF-8");
}

//--------Char Map-------
function send_values_to_parent(){
    opener.document.forms[0].serviceName.value = textfield.value;
}