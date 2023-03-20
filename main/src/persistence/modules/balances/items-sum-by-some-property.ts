export const itemsSumBySomeProperty = ({ list, property }) =>
  list.reduce((reduction, item) => {
    if (reduction[item[property]] === undefined) {
      reduction[item[property]] = 0;
    }

    reduction[item[property]] += item.amount;

    return reduction;
  }, {});
