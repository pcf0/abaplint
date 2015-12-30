import Issue from "./issue";

export default class Report {
    private issues: Array<Issue> = [];

    public add(issue: Issue) {
        this.issues.push(issue);
    }

    public get_count(): number {
        return this.issues.length;
    }

    public json(): string {
        let out = [];

        for (let issue of this.issues) {
            let single = { type: "issue",
                check_name: issue.get_description(),
                description: issue.get_description(),
                categories: ["Complexity"],
                location: {
                    path: issue.get_filename(),
                    lines: {
                        begin: issue.get_row(),
                        end: issue.get_row(),
                    },
                },
                };
            out.push(single);
        }
        return JSON.stringify(out, undefined, "  ");
    }

    public output(): string {
        let result = "";

        for (let issue of this.issues) {
            result = result + this.output_issue(issue);
        }
        result = result + "abaplint: " + this.get_count() + " issue(s) found\n";
        return result;
    }

    private output_issue(issue: Issue): string {
        return issue.get_filename() +
            "[" + issue.get_row() + ", " + issue.get_col() + "] \t" +
            issue.get_description() + "\n";
    }
}