import {Issue} from "../issue";
import {Position} from "../position";
import {ABAPRule} from "./_abap_rule";
import {ABAPFile} from "../files";
import {BasicRuleConfig} from "./_basic_rule_config";

export class LineLengthConf extends BasicRuleConfig {
  public length: number = 120;
}

export class LineLength extends ABAPRule {

  private conf = new LineLengthConf();

  public getKey(): string {
    return "line_length";
  }

  public getDescription(): string {
    return "Reduce line length";
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: LineLengthConf) {
    this.conf = conf;
  }

  public runParsed(file: ABAPFile) {
    const issues: Issue[] = [];

    const lines = file.getRaw().split("\n");
    for (let line = 0; line < lines.length; line++) {
      if (lines[line].length > this.conf.length) {
        const issue = new Issue({file, message: this.getDescription(), key: this.getKey(), start: new Position(line + 1, 1)});
        issues.push(issue);
      }
    }

    return issues;
  }

}