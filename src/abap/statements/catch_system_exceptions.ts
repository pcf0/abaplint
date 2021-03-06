import {Statement} from "./_statement";
import {verNot, str, seq, plus, IStatementRunnable} from "../combi";
import {Integer, Field} from "../expressions";
import {Version} from "../../version";

export class CatchSystemExceptions extends Statement {

  public getMatcher(): IStatementRunnable {
    const ret = seq(str("CATCH SYSTEM-EXCEPTIONS"),
                    plus(seq(new Field(), str("="), new Integer())));

    return verNot(Version.Cloud, ret);
  }

}