import "./styles.css";
import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import ClickAwayListener from "./clickAwayListener";

interface SelectOption {
  value?: string | number;
  label?: string | number;
}

type SetValue = (selectedOption: SelectOption) => void;

interface FormSelectTypes {
  options: SelectOption[];
  setValue: SetValue;
}

const FormSelect: React.FC<FormSelectTypes> = ({ options, setValue }) => {
  const selectLabel: SelectOption = { label: "Select" };
  const selectOptions: SelectOption[] = [selectLabel, ...options];
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    selectOptions[0]
  );

  const onSelect = (option: SelectOption) => {
    setSelectedOption(option);
    setOpenMenu(!openMenu);
    setValue(option);
  };

  const handleClickAway = () => {
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="form-select">
        <div className="select-c" onClick={() => setOpenMenu(!openMenu)}>
          <input
            className="select-title"
            value={selectedOption.label}
            readOnly
          />
        </div>
        <div className="options-container ">
          {openMenu &&
            selectOptions
              .filter((option) => option.label !== "Select")
              .map((option, index) => (
                <div
                  className={`option ${
                    selectedOption.value === option.value && "selected"
                  }`}
                  key={index.toString()}
                  onClick={() => onSelect(option)}
                >
                  {option.label}
                </div>
              ))}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default function App() {
  const methods = useForm();
  const onSetValue = (selectedOption: SelectOption) => {
    methods.setValue("select", selectedOption);
  };

  const [selected, setSelected] = React.useState<SelectOption>();

  const options: SelectOption[] = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" }
  ];

  const onSubmit = (data: { select: SelectOption }) => {
    setSelected(data.select);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>Seleted Option: {selected?.value}</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Controller
            name="select"
            control={methods.control}
            render={() => (
              <FormSelect setValue={onSetValue} options={options} />
            )}
          />
          <input className="submit" type="submit" value="Submit" />
        </form>
      </FormProvider>
    </div>
  );
}
