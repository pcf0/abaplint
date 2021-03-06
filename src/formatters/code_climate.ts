import {Issue} from "../issue";
import {Total} from "./total";
import {IFormatter} from "./_iformatter";

// for CodeClimate output?

export class CodeClimate implements IFormatter {
  public output(issues: Issue[], fileCount: number): string {

    let result = "";
    for (const issue of issues) {
      let code = issue.getFile().getRawRows()[issue.getStart().getRow() - 1];
      if (code) {
        code = code.trim();
      }

      const text = issue.getFile().getFilename() +
                 "[" + issue.getStart().getRow() + ", " +
                 issue.getStart().getCol() + "] - " +
                 issue.getMessage() + " - " +
                 code + "\n";

      result = result + text;
    }

    return result + new Total().output(issues, fileCount);
  }
}