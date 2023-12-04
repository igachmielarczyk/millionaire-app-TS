interface Props {
  m: {
    id: number;
    amount: string;
  };
  questionNumber: number;
}
const ListPyramid = ({m, questionNumber}:Props,) => {
  return (
    <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
      <span className="moneyListItemNumber">{m.id}</span>
      <span className="moneyListItemAmount">{m.amount}</span>
    </li>
  );
};

export default ListPyramid;
