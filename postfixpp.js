// postfixpp.js
// Postfix++ interpreter (stack + variables A–Z, sin, cos, tan, log, sqrt, mod, PI, E, clear)

// Input: A line of space-separated postfix tokens (e.g., "3 4 +")
// Output: Final result displayed as a stack

const readline = require('readline');

// simple data structures
const stack = []; // used as operand stack to evaluate postfix expressions (LIFO behaviour)
const symTable = {}; // symbol table to store and retrieve variable values (A–Z)

// Complex data structure: "map" for math functions with one argument
const mathFunctions = new Map([
  ['sin', x => Math.sin(x)],
  ['cos', x => Math.cos(x)],
  ['tan', x => Math.tan(x)],
  ['log', x => Math.log(x)],
  ['sqrt', x => Math.sqrt(x)] // adds support for the square root operation
]);

// Complex data structure: Set for handling constant names efficiently
const constants = new Set(['PI', 'E']);

// Setup command-line interface to read input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

console.log("Postfix++ Calculator (type 'help' or '?' for commands)");
rl.prompt();

// Helper function: Resolves a token into its numeric value
// It handles variables (A–Z), constants (PI, E), or numeric literals
function resolveValue(token) {
  if (typeof token === 'number') return token;
  if (typeof token === 'string') {
    if (symTable[token] !== undefined) return symTable[token]; // Lookup variable
    if (token === 'PI') return Math.PI;
    if (token === 'E') return Math.E;
    console.error(`Variable or constant '${token}' is undefined`);
    return undefined;
  }
  return undefined;
}

// Helper function: this evaluates binary arithmetic operations like +, -, *, /, mod
// Equivalent to pseudocode: APPLY-BINARY-OPERATOR
function evaluateArithmetic(op1, op2, operator) {
  const a = resolveValue(op1); // Resolve top of stack
  const b = resolveValue(op2); // Resolve next element
  if (a === undefined || b === undefined) return undefined;

  switch (operator) {
    case '+': return b + a;
    case '-': return b - a;
    case '*': return b * a;
    case '/':
      if (a === 0) {
        console.error("Error: Division by zero");
        return undefined;
      }
      return b / a;
    case 'mod': // New operation: modulus
      return b % a;
  }
}

// Helper function: Evaluate unary function like sin, log, etc.
function evaluateFunction(token, val) {
  const arg = resolveValue(val); // Resolve value from stack
  if (arg === undefined) return undefined;
  return mathFunctions.get(token)(arg);
}

// Main input loop: Triggered whenever the user types a line
rl.on('line', line => {
  const input = line.trim(); // Remove leading/trailing whitespace

  // Display help instructions
  if (input === 'help' || input === '?') {
    console.log(`
Postfix++ Help:
- Use space-separated postfix expressions (e.g., 3 4 +)
- Variables: A–Z (e.g., A 5 =)
- Constants: PI, E
- Operators: +  -  *  /  mod
- Functions: sin cos tan log sqrt
- Special command: clear (empties stack)
- Stack is cleared after each line
`);
    rl.prompt();
    return;
  }

  // clear the stack at the start of each new input line
  stack.length = 0;
  const tokens = input.split(/\s+/); // tokenizing the line

  tokens.forEach(token => {
    // case 1: number literal
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      stack.push(Number(token));

    // case 2: variable name (A–Z)
    } else if (/^[A-Z]$/.test(token)) {
      stack.push(token);

    // case 3: built-in constant
    } else if (constants.has(token)) {
      stack.push(token);

    // case 4: variable assignment 
    } else if (token === '=') {
      const rawVal = stack.pop();
      const name = stack.pop();
      if (typeof name !== 'string' || !/^[A-Z]$/.test(name)) {
        console.error(`Invalid variable name: ${name}`);
        return;
      }
      const value = resolveValue(rawVal);
      if (value === undefined) {
        console.error(`Cannot assign undefined value to variable ${name}`);
        return;
      }
      symTable[name] = value; // saves the value to symbol table

    // case 5: binary arithmetic operation 
    } else if (['+', '-', '*', '/', 'mod'].includes(token)) {
      const op1 = stack.pop();
      const op2 = stack.pop();
      const result = evaluateArithmetic(op1, op2, token);
      if (result !== undefined) stack.push(result);

    // case 6: unary math function 
    } else if (mathFunctions.has(token)) {
      const val = stack.pop();
      const result = evaluateFunction(token, val);
      if (result !== undefined) stack.push(result);

    // case 7: clear the stack
    } else if (token === 'clear') {
      stack.length = 0;

    // case 8: unknown input
    } else {
      console.error(`Unknown token: ${token}`);
    }
  });

  // formatting and displaying the final stack with numbers rounded to 6 decimal places
  const formattedStack = stack.map(val =>
    typeof val === 'number' ? Number(val.toFixed(6)) : val
  );
  console.log(`[${formattedStack.join(', ')}]`);
  rl.prompt();

}).on('close', () => {
  process.exit(0); // exits when Ctrl+C is pressed
});