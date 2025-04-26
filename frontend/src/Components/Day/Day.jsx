import "./Day.css";
import PropTypes from "prop-types";
import {useToast} from "../ToastProvider/ToastContext.jsx";

function getDayOfWeekName(dayId) {
  switch (dayId) {
    case 0: return "Montag";
    case 1: return "Dienstag";
    case 2: return "Mittwoch";
    case 3: return "Donnerstag";
    case 4: return "Freitag";
    default: throw Error("Invalid dayId");
  }
}

function Day({ weekDays, setWeekDays, dayId }) {
  const inputs = weekDays[dayId];
  const showToast = useToast();

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;

    const updatedWeek = [...weekDays];
    updatedWeek[dayId] = updatedInputs;
    setWeekDays(updatedWeek);
  };

  const handleAddInput = () => {
    if (inputs.length >= 5) return;
    const updatedWeek = [...weekDays];
    updatedWeek[dayId] = [...inputs, ""];
    setWeekDays(updatedWeek);
  };

  const handleRemoveInput = (index) => {
    if (weekDays[dayId].length === 1){
      showToast("Sie können die letzte Eingabe nicht entfernen", "error")
      return
    }
    const updatedInputs = inputs.filter((_, i) => i !== index);
    const updatedWeek = [...weekDays];
    updatedWeek[dayId] = updatedInputs;
    setWeekDays(updatedWeek);
  };

  const copyToCipboard = (index) => {
    navigator.clipboard.writeText(weekDays[dayId][index]);
    showToast("Erfolgreich in die Zwischenablage kopiert", "success");
  }

  return (
    <div className="day-container">
      <h2 className="title">{getDayOfWeekName(dayId)}</h2>

      {inputs.map((inputValue, index) => (
        <div key={index} className="input-row">
          <input type="text"
                 maxLength="249"
                 value={inputValue}
                 onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <div className="button cross" onClick={() => handleRemoveInput(index)}>X</div>
          <div className="button cross" onClick={() => copyToCipboard(index)}>📋</div>
        </div>
      ))}

      {inputs.length < 3 && (
        <div onClick={handleAddInput} className="button">Eingabe hinzufügen</div>
      )}
    </div>
  );
}

Day.propTypes = {
  weekDays: PropTypes.array.isRequired,
  setWeekDays: PropTypes.func.isRequired,
  dayId: PropTypes.number.isRequired,
};

export default Day;
