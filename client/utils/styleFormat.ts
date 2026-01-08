

function classConditionFormat(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export { classConditionFormat as ccf };