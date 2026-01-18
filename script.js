// Declare variables for getting the xml file for the XSL transformation (folio_xml) and to load the image in IIIF on the page in question (number).
let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let extension = ".xml";
let folio_xml = tei_xml.concat(extension);
let page = document.getElementById("page");
let pageN = page.innerHTML;
let number = Number(pageN);

// Loading the IIIF manifest
var mirador = Mirador.viewer({
  "id": "my-mirador",
  "manifests": {
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
      provider: "Bodleian Library, University of Oxford"
    }
  },
  "window": {
    allowClose: false,
    allowWindowSideBar: true,
    allowTopMenuButton: false,
    allowMaximize: false,
    hideWindowTitle: true,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      annotations: false,
      search: false,
      layers: false,
    }
  },
  "workspaceControlPanel": {
    enabled: false,
  },
  "windows": [
    {
      loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
      canvasIndex: number,
      view: "single",
      thumbnailNavigationPosition: 'off'
    }
  ]
});


// function to transform the text encoded in TEI with the xsl stylesheet "Frankenstein_text.xsl", this will apply the templates and output the text in the html <div id="text">
function documentLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("Frankenstein_text.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }
  
// function to transform the metadate encoded in teiHeader with the xsl stylesheet "Frankenstein_meta.xsl", this will apply the templates and output the text in the html <div id="stats">
  function statsLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("Frankenstein_meta.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("stats");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }

  // Initial document load
  documentLoader();
  statsLoader();
  // Event listener for sel1 change
  function selectHand(event) {
    var visible_mary = document.getElementsByClassName('#MWS');
    var visible_percy = document.getElementsByClassName('#PBS');
    // Convert the HTMLCollection to an array for forEach compatibility
    var MaryArray = Array.from(visible_mary);
    var PercyArray = Array.from(visible_percy);
    if (event.target.value == 'both') {
    //write an forEach() method that shows all the text written and modified by both hand (in black?). The forEach() method of Array instances executes a provided function once for each array element.
      MaryArray.forEach((item) => {
        item.style.color = 'black';
      });
      PercyArray.forEach((item) => {
        item.style.color = 'black';
      });
    } else if (event.target.value == 'Mary') {
    //write an forEach() method that shows all the text written and modified by Mary in a different color (or highlight it) and the text by Percy in black. 
      MaryArray.forEach((item) => {
        item.style.color = 'brown';
      });
      PercyArray.forEach((item) => {
        item.style.color = 'black';
      });
    } else {
    //write an forEach() method that shows all the text written and modified by Percy in a different color (or highlight it) and the text by Mary in black.
      MaryArray.forEach((item) => {
        item.style.color = 'black';
      });
      PercyArray.forEach((item) => {
        item.style.color = 'brown';
      });
    }
  }
// write another function that will toggle the display of the deletions by clicking on a button
// EXTRA: write a function that will display the text as a reading text by clicking on a button or another dropdown list, meaning that all the deletions are removed and that the additions are shown inline (not in superscript)

// Function that displays the default text (showing all deletions and additions) by clicking on the first radio button

let labelElement1 = document.getElementById('showAll');
labelElement1.addEventListener('click', showAll);

function showAll() {
  let deletions = document.getElementsByClassName('deletions');
  let delArray = Array.from(deletions);
  delArray.forEach((deletion) => {
    deletion.style.display = "inline";
    deletion.style.visibility = "visible"; 
  });
  
  let additions =  document.getElementsByClassName('additions');
  let addArray = Array.from(additions);
  addArray.forEach((addition) => {
    addition.style.fontStyle = "italic";
  });
  
  let supraAdditions =  document.getElementsByClassName('supraAdd');
  let supraAddArray = Array.from(supraAdditions);
  supraAddArray.forEach((supraAddition) => {
    supraAddition.style.fontStyle = "italic";
    supraAddition.style.verticalAlign = "90%";
    supraAddition.style.fontSize = "smaller";
  });
}

// Function that hides deletions by clicking on the second radio button

let labelElement2 = document.getElementById('hideDel');
labelElement2.addEventListener('click', hideDeletions);

function hideDeletions() {
  showAll();
  let deletions = document.getElementsByClassName('deletions');
  let delArray = Array.from(deletions);
  delArray.forEach((deletion) => {
    deletion.style.display = "inline";
    deletion.style.visibility = "hidden";  
    });
}

// Function that displays the text as reading text by clicking on the third radio button

let labelElement3 = document.getElementById('readText');
labelElement3.addEventListener('click', readingText);

function readingText() {
  let deletions = document.getElementsByClassName('deletions');
  let delArray = Array.from(deletions);
  delArray.forEach((deletion) => {
    deletion.style.display = "none";
  });

  let additions =  document.getElementsByClassName('additions');
  let addArray = Array.from(additions);
  addArray.forEach((addition) => {
    addition.style.fontStyle = "normal";
  });

  let supraAdditions =  document.getElementsByClassName('supraAdd');
  let supraAddArray = Array.from(supraAdditions); 
  supraAddArray.forEach((supraAddition) => {
    supraAddition.style.fontStyle = "normal";
    supraAddition.style.verticalAlign = "0%";
    supraAddition.style.fontSize = "initial";
  });
}

