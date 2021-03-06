import {Issue} from "../issue";
import {Position} from "../position";
import {ABAPRule} from "./_abap_rule";
import {ABAPFile} from "../files";
import {BasicRuleConfig} from "./_basic_rule_config";

export class LineOnlyPuncConf extends BasicRuleConfig {
  public ignoreExceptions: boolean = true;
}

export class LineOnlyPunc extends ABAPRule {

  private conf = new LineOnlyPuncConf();

  public getKey(): string {
    return "line_only_punc";
  }

  public getDescription(): string {
    return "Line contains only . or ).";
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: LineOnlyPuncConf) {
    this.conf = conf;
  }

  public runParsed(file: ABAPFile) {
    const issues: Issue[] = [];
    let exception = false;

    const rows = file.getRawRows();
    for (let i = 0; i < rows.length; i++) {
      const trim = rows[i].trim();

      if (trim.match(/^CLASS .?CX/i) && this.conf.ignoreExceptions) {
        exception = true;
      } else if (trim.match(/^ENDCLASS/i)) {
        exception = false;
      } else if ((trim === "." || trim === ").") && exception === false) {
        const issue = new Issue({file, message: this.getDescription(), key: this.getKey(), start: new Position(i + 1, 0)});
        issues.push(issue);
      }
    }

    return issues;
  }

}