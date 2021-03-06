import {str, tok, alt, Expression, IStatementRunnable} from "../combi";
import {WPlusW, WDashW} from "../tokens/";

export class ArithOperator extends Expression {
  public getRunnable(): IStatementRunnable {
    const ret = alt(tok(WPlusW),
                    tok(WDashW),
                    str("*"),
                    str("**"),
                    str("/"),
                    str("BIT-XOR"),
                    str("BIT-AND"),
                    str("BIT-OR"),
                    str("DIV"),
                    str("MOD"));

    return ret;
  }
}