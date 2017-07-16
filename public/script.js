/* public/script.js */

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');






    // make the tab act like a tab
   pad.addEventListener('keydown',function(e) {
       if(e.keyCode === 9) { // tab was pressed
           // get caret position/selection
           var start = this.selectionStart;
           var end = this.selectionEnd;

           var target = e.target;
           var value = target.value;

           // set textarea value to: text before caret + tab + text after caret
           target.value = value.substring(0, start)
                           + "\t"
                           + value.substring(end);

           // put caret at right position again (add one for the tab)
           this.selectionStart = this.selectionEnd = start + 1;

           // prevent the focus lose
           e.preventDefault();
       }
   });

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();



    //Sync Scrolling

    var isSyncingLeftScroll = false;
    var isSyncingRightScroll = false;
    var leftDiv = document.getElementById('pad');
    var rightDiv = document.getElementById('markdown');

    leftDiv.onscroll = function() {
      if (!isSyncingLeftScroll) {
        isSyncingRightScroll = true;
        rightDiv.scrollTop = this.scrollTop;
      }
      isSyncingLeftScroll = false;
    }

    rightDiv.onscroll = function() {
      if (!isSyncingRightScroll) {
        isSyncingLeftScroll = true;
        leftDiv.scrollTop = this.scrollTop;
      }
      isSyncingRightScroll = false;
    }


};
