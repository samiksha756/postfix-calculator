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

### Run
Clone or download the repo, then:

```bash
node postfixpp.js

##License
This project is released under the terms in LICENSE.txt.
