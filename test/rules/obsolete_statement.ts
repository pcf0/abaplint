import {ObsoleteStatement} from "../../src/rules/obsolete_statement";
import {testRule} from "./_utils";

const tests = [
  {abap: "REFRESH lt_table.", cnt: 1},
  {abap: "COMPUTE lv_foo = 2 + 2.", cnt: 1},
  {abap: "SUBTRACT 2 FROM lv_foo.", cnt: 1},
  {abap: "MULTIPLY lv_foo BY 2.", cnt: 1},
  {abap: "DIVIDE lv_foo BY 2.", cnt: 1},
  {abap: "MOVE 2 TO lv_foo.", cnt: 1},
  {abap: "IF foo IS REQUESTED.", cnt: 1},

  {abap: "CLEAR lt_table.", cnt: 0},
  {abap: "lv_foo = 2 + 2.", cnt: 0},
  {abap: "MOVE EXACT is_status-installed_release TO lv_number.", cnt: 0},
  {abap: "lv_foo = lv_foo - 1.", cnt: 0},
  {abap: "lv_foo = lv_foo * 2.", cnt: 0},
  {abap: "lv_foo = lv_foo / 2.", cnt: 0},
  {abap: "lv_foo = 2.", cnt: 0},
  {abap: "IF foo IS SUPPLIED.", cnt: 0},
];

testRule(tests, ObsoleteStatement);