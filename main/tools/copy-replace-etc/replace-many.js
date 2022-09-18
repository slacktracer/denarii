export const replaceMany = ({ replace, replaceBy, text }) =>
  replace.reduce((reduction, item, index) => {
    reduction = reduction.replace(new RegExp(item, "g"), replaceBy[index]);

    return reduction;
  }, text);
