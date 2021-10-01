var blynk;
var virtualPins = {};

var initBlynk = function(auth) {
//   blynk = new Blynk.Blynk(auth);

  // For custom WsClient connection:
  blynk = new Blynk.Blynk(auth, {
    connector: new Blynk.WsClient({
      addr: 'a9i.sg', port:8081, path: '/websockets'
    })
  });

  function setupVirtualPin(pin) {
    var vp = new blynk.VirtualPin(pin);

    vp.on('write', function(param) {
      var status = param[0];
      console.log('V' + pin + ': ' + status);
      if (typeof window['onWriteV' + pin] == 'function') {
        window['onWriteV' + pin](status);
      }
    });

    vp.on('read', function(){
      if (typeof window['onReadV' + pin] == 'function') {
        window['onReadV' + pin]();
      }
    });

    virtualPins['V' + pin] = vp;
  }

  setupVirtualPin(0);
  setupVirtualPin(1);
  setupVirtualPin(2);
  setupVirtualPin(3);
  setupVirtualPin(4);
  setupVirtualPin(5);

  blynk.on('connect', function() {
    $("#status").text("Connected");
    console.log("Blynk ready. Sending sync request...");
    blynk.syncAll();
  });
  blynk.on('disconnect', function() {
    $("#status").text("Disconnected");
    console.log("Blynk disconnected.");
  });
};

function runBlocks() {
  delete whenStarted;
  delete clickedD0;
  delete clickedD1;
  delete clickedD2;
  delete clickedD3;
  delete clickedD4;
  delete clickedD5;
  delete clickedD6;
  delete clickedD7;
  delete clickedD8;
  delete _loop;

  var code = Blockly.JavaScript.workspaceToCode(workspace);

  console.log(code);
  var geval = eval; // Run eval in global scope

  try {
    geval(code);
    whenStarted();
    $('#run').attr('disabled', true);
  } catch (e) {
    console.log(e);
  }
}

function saveBlocks() {
  if (workspace) {
    let dom = Blockly.Xml.workspaceToDom(workspace);
    let xmlText = Blockly.Xml.domToText(dom);
    localStorage.setItem('blocklyIoTXML', xmlText);
  }
}

function loadBlocks() {
  var xmlText = localStorage.getItem('blocklyIoTXML')
  if (xmlText) {
    workspace.clear();
    let dom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(dom, workspace);
  }
}

function enableRun() {
  $('#run').attr('disabled', false);
}

function genArduino() {
  var code =
    '#include <ESP8266WiFi.h>\n' +
    '#include <BlynkSimpleEsp8266.h>\n\n' +
    Blockly.Arduino.workspaceToCode(workspace);

  for (let i=0; i<9; i++) {
    if (code.search(new RegExp('void clickedD' + i + '\\(\\) {')) == -1) {
      code = code.replace(new RegExp(' *if \\(digitalRead\\(D' + i + '\\)\\) clickedD' + i + '\\(\\);\\n'), '');
    }
  }
  if (code.search(/void _loop\(\) {/) == -1) {
    code = code.replace(/ *_loop\(\);\n/, '');
  }

  document.getElementById('arduino').textContent = code;
}

function copyCode () {
  $('#copyCode .tooltip').css('display', 'block');
  document.getElementById('arduino').select();
  document.getElementById('arduino').setSelectionRange(0, 99999);
  document.execCommand('copy');
  setTimeout(function() {
    $('#copyCode .tooltip').css('display', 'none');
  }, 500);
}

function moreSpace(e) {
  if (e.target.checked) {
    $('#blocklyDiv').css('height', '900px');
    window.dispatchEvent(new Event('resize'));
  } else {
    $('#blocklyDiv').css('height', '600px');
    window.dispatchEvent(new Event('resize'));
  }
}

function init() {
  $('#space').change(moreSpace);
  $('#genArduinoCode').click(genArduino);
  $('#copyCode').click(copyCode);

  // Blockly stuff
  Blockly.defineBlocksWithJsonArray(customBlocks);
  workspace = Blockly.inject(
    'blocklyDiv',
    {
      toolbox: document.getElementById('toolbox'),
      zoom: {
        controls: true
      }
    }
  );
  workspace.addChangeListener(saveBlocks);
  workspace.addChangeListener(enableRun);
  workspace.addChangeListener(Blockly.Events.disableOrphans);
  loadBlocks();

  // Button controls
  $('.button').on('pointerdown', function(e) {
    e.currentTarget.src = 'images/buttonOn.png?v=6a4c085b';
    let pin = e.currentTarget.getAttribute('pin');
    if (typeof window['clicked' + pin] == 'function') {
      window['clicked' + pin]()
    }
    window['get' + pin] = function() { return 1; };
  });
  $('.button').on('pointerup', function(e) {
    let pin = e.currentTarget.getAttribute('pin');
    e.currentTarget.src = 'images/buttonOff.png?v=a0014273';
    window['get' + pin] = function() { return 0; };
  });
  $('.button').on('pointerleave', function(e) {
    let pin = e.currentTarget.getAttribute('pin');
    e.currentTarget.src = 'images/buttonOff.png?v=a0014273';
    window['get' + pin] = function() { return 0; };
  });

  // Run blocks
  $('#run').click(runBlocks);

  // Run loop
  setInterval(function(){
    if (typeof _loop == 'function') {
      _loop();
    }
  }, 200);
}