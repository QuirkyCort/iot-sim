var customBlocks = [{
  "type": "when_started",
  "message0": "When Started %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME"
    }
  ],
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "data",
  "message0": "Received data",
  "output": "Number",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "connect",
  "message0": "Connect to IoT server with auth code: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "auth",
      "text": ""
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "d1_clicked",
  "message0": "When D1 is pressed %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME"
    }
  ],
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "notification",
  "message0": "Send Message %1",
  "args0": [
    {
      "type": "input_value",
      "name": "msg"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "on_write",
  "message0": "When %1 receives data %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [
          "V0",
          "V0"
        ],
        [
          "V1",
          "V1"
        ],
        [
          "V2",
          "V2"
        ],
        [
          "V3",
          "V3"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME"
    }
  ],
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "change_state",
  "message0": "Turn %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [
          "D0",
          "D0"
        ],
        [
          "D2",
          "D2"
        ],
        [
          "D3",
          "D3"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "state",
      "options": [
        [
          "on",
          "ON"
        ],
        [
          "off",
          "OFF"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "parsefloat",
  "message0": "Convert %1 %2 to number",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "loop_forever",
  "message0": "Loop forever %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME"
    }
  ],
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "a0",
  "message0": "Value of A0",
  "output": "Number",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
}];

Blockly.JavaScript['when_started'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code =
    'function whenStarted() {\n' +
    statements +
    '};\n';
  return code;
};

Blockly.JavaScript['data'] = function(block) {
  var code = 'parseInt(data)';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['connect'] = function(block) {
  var text_auth = block.getFieldValue('auth');
  var code = 'initBlynk("' + text_auth + '");\n';
  return code;
};

Blockly.JavaScript['d1_clicked'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code =
    'function d1Clicked() {\n' +
    statements +
    '};\n';
  return code;
};

Blockly.JavaScript['notification'] = function(block) {
  var value_msg = Blockly.JavaScript.valueToCode(block, 'msg', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'blynk.notify(' + value_msg + ');\n';
  return code;
};

Blockly.JavaScript['on_write'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var statements = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code =
    'function onWrite' + dropdown_pin + '(data) {\n' +
    statements +
    '};\n';
  return code;
};

Blockly.JavaScript['change_state'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var dropdown_state = block.getFieldValue('state');
  src2 = '';
  if (dropdown_pin == 'D0') {
    var ele = '#led';
    if (dropdown_state == 'ON') {
      var src = 'images/ledOn.png?v=f644be45';
    } else {
      var src = 'images/ledOff.png?v=0f115ad9';
    }
  } else if (dropdown_pin == 'D2') {
    var ele = '#sprinkler';
    if (dropdown_state == 'ON') {
      var src = 'images/sprinklerOn.png?v=ce567175';
      src2 = 'sprinklerOn = true;\n';
    } else {
      var src = 'images/sprinklerOff.png?v=e77ccb1f';
      src2 = 'sprinklerOn = false;\n';
    }
  } else if (dropdown_pin == 'D3') {
    var ele = '#door';
    if (dropdown_state == 'ON') {
      var src = 'images/doorOpen.png?v=4531e2d9';
    } else {
      var src = 'images/doorClose.png?v=2a176ab2';
    }
  }

  var code = '$("' + ele + '").attr("src", "' + src + '");\n' + src2;
  return code;
};

Blockly.JavaScript['text_print'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, "TEXT", Blockly.JavaScript.ORDER_NONE);
  var code = '$("#console").val(' + value + ');\n';
  return code;
};

// Blockly.JavaScript['parsefloat'] = function(block) {
//   var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
//   var code = 'parseFloat(' + value_text + ')';
//   return [code, Blockly.JavaScript.ORDER_NONE];
// };

Blockly.JavaScript['loop_forever'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code =
    'function _loop() {\n' +
    statements +
    '};\n';
  return code;
};

Blockly.JavaScript['a0'] = function(block) {
  var code = 'plantWater';
  return [code, Blockly.JavaScript.ORDER_NONE];
};