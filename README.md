# Postfix++ Calculator (Node.js CLI)

A simple **postfix (Reverse-Polish)** calculator with a stack, single-letter variables (**A–Z**), built-in constants (**PI**, **E**), arithmetic operators, and math functions.  
Runs interactively in your terminal.

---

## Features
- **Postfix evaluation** of space-separated tokens (e.g., `3 4 +`).
- **Operators:** `+` `-` `*` `/` `mod`
- **Math functions:** `sin` `cos` `tan` `log` `sqrt`
- **Constants:** `PI` `E`
- **Variables:** single uppercase letters `A … Z` (assignment with `=`)
- **Commands:** `clear` (empties the stack), `help`/`?` (usage guide)
- **State model:** the **stack resets each line**; **variables persist** across lines.
- **Output:** stack printed after every line, numbers rounded to 6 d.p. (e.g., `[1.570796]`)

---

## Getting Started

### Prerequisites
- **Node.js** v16+ (v18+ recommended)

### How to Run the Code
Clone or download the repo, then:

```bash
node postfixpp.js
```
You'll see:
`Postfix++ Calculator (type 'help' or '?' for commands)
>`

Type an expression and press **Enter**

### Usage
#### Basics
```> 3 4 +
[7]
> 8 2 / 3 *
[12]
> 10 3 mod
[1]
```

#### Variables (A-Z)
```> A 5 =
[]
> A 2 *
[10]
> B 3 =
[]
> A B +
[8]
```
- Assignment pops ```<name> <value>``` -> saves ``` name = value ```.
- Only **single uppercase letters** are valid names.

#### Constants and Functions
```> PI 2 /
[1.570796]
> PI 2 / sin
[1]
> 9 sqrt
[3]
> E log
[1]
```
#### Clear and help
```> 1 2 3
[1, 2, 3]
> clear
[]
> help
# prints usage and supported tokens
```
#### Exit
Press **Ctrl + C**
