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
  "type": "d_clicked",
  "message0": "When %1 is pressed %2 %3",
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
          "D1",
          "D1"
        ],
        [
          "D2",
          "D2"
        ],
        [
          "D3",
          "D3"
        ],
        [
          "D4",
          "D4"
        ],
        [
          "D5",
          "D5"
        ],
        [
          "D6",
          "D6"
        ],
        [
          "D7",
          "D7"
        ],
        [
          "D8",
          "D8"
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
  "type": "analog_write",
  "message0": "Analog Write %1 %2",
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
          "D1",
          "D1"
        ],
        [
          "D2",
          "D2"
        ],
        [
          "D3",
          "D3"
        ],
        [
          "D4",
          "D4"
        ],
        [
          "D5",
          "D5"
        ],
        [
          "D6",
          "D6"
        ],
        [
          "D7",
          "D7"
        ],
        [
          "D8",
          "D8"
        ]

      ]
    },
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "digital_write",
  "message0": "Digital Write %1 %2",
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
          "D1",
          "D1"
        ],
        [
          "D2",
          "D2"
        ],
        [
          "D3",
          "D3"
        ],
        [
          "D4",
          "D4"
        ],
        [
          "D5",
          "D5"
        ],
        [
          "D6",
          "D6"
        ],
        [
          "D7",
          "D7"
        ],
        [
          "D8",
          "D8"
        ]

      ]
    },
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "set_virtual",
  "message0": "Set Virtual Pin %1 to %2",
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
        ],
        [
          "V4",
          "V4"
        ],
        [
          "V5",
          "V5"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "value"
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
        ],
        [
          "V4",
          "V4"
        ],
        [
          "V5",
          "V5"
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
  "type": "on_read",
  "message0": "When app request data from %1 %2 %3",
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
        ],
        [
          "V4",
          "V4"
        ],
        [
          "V5",
          "V5"
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
          "D1",
          "D1"
        ],
        [
          "D2",
          "D2"
        ],
        [
          "D3",
          "D3"
        ],
        [
          "D4",
          "D4"
        ],
        [
          "D5",
          "D5"
        ],
        [
          "D6",
          "D6"
        ],
        [
          "D7",
          "D7"
        ],
        [
          "D8",
          "D8"
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
},
{
  "type": "dPinValue",
  "message0": "Value of %1",
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
          "D1",
          "D1"
        ],
        [
          "D2",
          "D2"
        ],
        [
          "D3",
          "D3"
        ],
        [
          "D4",
          "D4"
        ],
        [
          "D5",
          "D5"
        ],
        [
          "D6",
          "D6"
        ],
        [
          "D7",
          "D7"
        ],
        [
          "D8",
          "D8"
        ]
      ]
    },
  ],
  "output": "Number",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "connect_to_wifi",
  "message0": "Connect to WiFi %1 with password %2",
  "args0": [
    {
      "type": "field_input",
      "name": "SSID",
      "text": "SSID"
    },
    {
      "type": "field_input",
      "name": "PASSWORD",
      "text": "password"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
];

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

Blockly.JavaScript['d_clicked'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var statements = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code =
    'function clicked' + dropdown_pin + '() {\n' +
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

Blockly.JavaScript['on_read'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var statements = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code =
    'function onRead' + dropdown_pin + '(data) {\n' +
    statements +
    '};\n';
  return code;
};


Blockly.JavaScript['change_state'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var dropdown_state = block.getFieldValue('state');

  let code = '';
  if (dropdown_state == 'ON') {
    if (typeof window['digitalWrite' + dropdown_pin] == 'function') {
      code = 'digitalWrite' + dropdown_pin + '(1);\n';
    }
  } else {
    if (typeof window['digitalWrite' + dropdown_pin] == 'function') {
      code = 'digitalWrite' + dropdown_pin + '(0);\n';
    }
  }

  return code;
};

Blockly.JavaScript['analog_write'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var value_msg = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

  let code = '';
  if (typeof window['analogWrite' + dropdown_pin] == 'function') {
    code = 'analogWrite' + dropdown_pin + '(' + value_msg + ');\n';
  }
  return code;
};

Blockly.JavaScript['digital_write'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var value_msg = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

  let code = '';
  if (typeof window['digitalWrite' + dropdown_pin] == 'function') {
    code = 'digitalWrite' + dropdown_pin + '(' + value_msg + ');\n';
  }
  return code;
};

Blockly.JavaScript['set_virtual'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var value_msg = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

  code = 'virtualPins.' + dropdown_pin + '.write(' + value_msg + ');\n';
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
  let code = '0';
  if (typeof getA0 == 'function') {
    code = 'getA0()';
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dPinValue'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  let code = '0';
  if (typeof window['get' + dropdown_pin] == 'function') {
    code = 'get' + dropdown_pin + '()';
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['connect_to_wifi'] = function(block) {
  return '';
};