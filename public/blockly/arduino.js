Blockly.Arduino = new Blockly.Generator('Arduino');

Blockly.Arduino.addReservedWords(
  'break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,' +
  'enum,' +
  'implements,interface,let,package,private,protected,public,static,' +
  'await,' +
  'null,true,false,' +
  'arguments,' +
  Object.getOwnPropertyNames(Blockly.utils.global).join(','));

Blockly.Arduino.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.Arduino.ORDER_NEW = 1.1;            // new
Blockly.Arduino.ORDER_MEMBER = 1.2;         // . []
Blockly.Arduino.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.Arduino.ORDER_INCREMENT = 3;        // ++
Blockly.Arduino.ORDER_DECREMENT = 3;        // --
Blockly.Arduino.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.Arduino.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.Arduino.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.Arduino.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.Arduino.ORDER_TYPEOF = 4.5;         // typeof
Blockly.Arduino.ORDER_VOID = 4.6;           // void
Blockly.Arduino.ORDER_DELETE = 4.7;         // delete
Blockly.Arduino.ORDER_AWAIT = 4.8;          // await
Blockly.Arduino.ORDER_EXPONENTIATION = 5.0; // **
Blockly.Arduino.ORDER_MULTIPLICATION = 5.1; // *
Blockly.Arduino.ORDER_DIVISION = 5.2;       // /
Blockly.Arduino.ORDER_MODULUS = 5.3;        // %
Blockly.Arduino.ORDER_SUBTRACTION = 6.1;    // -
Blockly.Arduino.ORDER_ADDITION = 6.2;       // +
Blockly.Arduino.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.Arduino.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.Arduino.ORDER_IN = 8;               // in
Blockly.Arduino.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.Arduino.ORDER_EQUALITY = 9;         // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 10;     // &
Blockly.Arduino.ORDER_BITWISE_XOR = 11;     // ^
Blockly.Arduino.ORDER_BITWISE_OR = 12;      // |
Blockly.Arduino.ORDER_LOGICAL_AND = 13;     // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 14;      // ||
Blockly.Arduino.ORDER_CONDITIONAL = 15;     // ?:
Blockly.Arduino.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.Arduino.ORDER_YIELD = 17;           // yield
Blockly.Arduino.ORDER_COMMA = 18;           // ,
Blockly.Arduino.ORDER_NONE = 99;            // (...)

Blockly.Arduino.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.Arduino.ORDER_LOGICAL_NOT, Blockly.Arduino.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.Arduino.ORDER_MULTIPLICATION, Blockly.Arduino.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.Arduino.ORDER_ADDITION, Blockly.Arduino.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.Arduino.ORDER_LOGICAL_AND, Blockly.Arduino.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.Arduino.ORDER_LOGICAL_OR, Blockly.Arduino.ORDER_LOGICAL_OR]
];

Blockly.Arduino.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Arduino.functionNames_ = Object.create(null);

  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ =
        new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }

  Blockly.Arduino.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.Arduino.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.Arduino.variableDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME));
  }

  // Declare all of the variables.
  if (defvars.length) {
    Blockly.Arduino.definitions_['variables'] =
        'var ' + defvars.join(', ') + ';';
  }
};


/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Arduino.definitions_) {
    definitions.push(Blockly.Arduino.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.Arduino.definitions_;
  delete Blockly.Arduino.functionNames_;
  Blockly.Arduino.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/"/g, '\\\"');
  return '\"' + string + '\"';
};

/**
 * Encode a string as a properly escaped multiline Arduino string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.multiline_quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  var lines = string.split(/\n/g).map(Blockly.Arduino.quote_);
  return lines.join(' + \'\\n\' +\n');
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
          Blockly.Arduino.COMMENT_WRAP - 3);
      commentCode += Blockly.Arduino.prefixLines(comment + '\n', '// ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.Arduino.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Arduino.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Arduino.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = Number(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.Arduino.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Arduino.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Arduino.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};

Blockly.Arduino['when_started'] = function(block) {
  var statements_name = Blockly.Arduino.statementToCode(block, 'NAME');

  var code =
    '#include <ESP8266WiFi.h>\n' +
    '#include <BlynkSimpleEsp8266.h>\n\n' +
    'void setup() {\n' +
    statements_name +
    '}\n\n' +
    'void loop() {\n' +
    '  _loop();\n' +
    '  if (digitalRead(D1)) d1Clicked();\n' +
    '  Blynk.run();\n' +
    '}\n\n';

    return code;
};

Blockly.Arduino['loop_forever'] = function(block) {
  var statements_name = Blockly.Arduino.statementToCode(block, 'NAME');

  var code =
    'void _loop() {\n' +
    statements_name +
    '}\n\n';

    return code;
};

Blockly.Arduino['connect_to_wifi'] = function(block) {
  var text_ssid = block.getFieldValue('SSID');
  var text_password = block.getFieldValue('PASSWORD');

  var code =
    'char ssid[] = "' + text_ssid + '";\n' +
    'char pass[] = "' + text_password +'";\n';

  return code;
};

Blockly.Arduino['connect'] = function(block) {
  var text_auth = block.getFieldValue('auth');

  var code = 'Blynk.begin("' + text_auth + '", ssid, pass);\n';
  return code;
};

Blockly.Arduino['text_print'] = function(block) {
  return '';
};

Blockly.Arduino['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_PREFIX,
        block);
  }
  do {
    conditionCode = Blockly.Arduino.valueToCode(block, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
    branchCode = Blockly.Arduino.statementToCode(block, 'DO' + n);
    if (Blockly.Arduino.STATEMENT_SUFFIX) {
      branchCode = Blockly.Arduino.prefixLines(
          Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX,
          block), Blockly.Arduino.INDENT) + branchCode;
    }
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.Arduino.STATEMENT_SUFFIX) {
    branchCode = Blockly.Arduino.statementToCode(block, 'ELSE');
    if (Blockly.Arduino.STATEMENT_SUFFIX) {
      branchCode = Blockly.Arduino.prefixLines(
          Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX,
          block), Blockly.Arduino.INDENT) + branchCode;
    }
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.Arduino['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['a0'] = function(block) {
  var code = 'A0';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_number'] = function(block) {
  // Numeric value.
  var code = Number(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.Arduino.ORDER_ATOMIC :
              Blockly.Arduino.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.Arduino['change_state'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var dropdown_state = block.getFieldValue('state');

  if (dropdown_state == 'ON') {
    var state = 'HIGH';
  } else {
    var state = 'LOW';
  }

  code = 'digitalWrite(' + dropdown_pin + ', ' + state + ');\n';
  return code;
};

Blockly.Arduino['notification'] = function(block) {
  var value_msg = Blockly.Arduino.valueToCode(block, 'msg', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'Blynk.notify(' + value_msg + ');\n';
  return code;
};

Blockly.Arduino['text'] = function(block) {
  // Text value.
  var code = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text.forceString_ = function(value) {
  if (Blockly.Arduino.text.forceString_.strRegExp.test(value)) {
    return value;
  }
  return 'String(' + value + ')';
};

/**
 * Regular expression to detect a single-quoted string literal.
 */
Blockly.Arduino.text.forceString_.strRegExp = /^\s*'([^']|\\')*'\s*$/;

Blockly.Arduino['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
    case 1:
      var element = Blockly.Arduino.valueToCode(block, 'ADD0',
          Blockly.Arduino.ORDER_NONE) || '\'\'';
      var code = Blockly.Arduino.text.forceString_(element);
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
    case 2:
      var element0 = Blockly.Arduino.valueToCode(block, 'ADD0',
          Blockly.Arduino.ORDER_NONE) || '\'\'';
      var element1 = Blockly.Arduino.valueToCode(block, 'ADD1',
          Blockly.Arduino.ORDER_NONE) || '\'\'';
      var code = Blockly.Arduino.text.forceString_(element0) + ' + ' +
          Blockly.Arduino.text.forceString_(element1);
      return [code, Blockly.Arduino.ORDER_ADDITION];
    default:
      var elements = new Array(block.itemCount_);
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Arduino.valueToCode(block, 'ADD' + i,
            Blockly.Arduino.ORDER_COMMA) || '\'\'';
      }
      var code = '[' + elements.join(',') + '].join(\'\')';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
};

Blockly.Arduino['on_write'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var statements = Blockly.Arduino.statementToCode(block, 'NAME');

  var code =
    'BLYNK_WRITE(' + dropdown_pin + ') {\n' +
    statements +
    '}\n';
  return code;
};

Blockly.Arduino['data'] = function(block) {
  var code = 'param.asInt()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['d1_clicked'] = function(block) {
  var statements = Blockly.Arduino.statementToCode(block, 'NAME');
  var code =
    'void d1Clicked() {\n' +
    statements +
    '};\n';
  return code;
};

Blockly.Arduino['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Arduino.valueToCode(block, 'TIMES',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block);
  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.Arduino.variableDB_.getDistinctName(
        'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
    code += 'int ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};