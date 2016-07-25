import { Statement } from "./statement";
import { Token } from "../tokens/";
import Reuse from "./reuse";
import * as Combi from "../combi";

let str = Combi.str;
let seq = Combi.seq;

export class Subtract extends Statement {

  public static get_matcher(): Combi.IRunnable {
    return seq(str("SUBTRACT"), Reuse.source(), str("FROM"), Reuse.target());
  }

  public static match(tokens: Array<Token>): Statement {
    let result = Combi.Combi.run(this.get_matcher(), tokens, true);
    if (result === true) {
      return new Subtract(tokens);
    }
    return undefined;
  }

}