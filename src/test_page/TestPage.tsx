/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useRef, useEffect } from "react";
import CommonInputField from "../common/CommonInputField";

import DateRangePicker from "../common/DateRangePicker";
import FilePickerInput from "../common/FilePickerInput";
import DropDown from "../common/DropDown";

const data1 = [
  {
    name: "name one",
    note: "first note",
    date: "2016-06-08T12:43:00.000Z",
    file: File,
    fileName: "sample 1",
    filePath: "fileName1",
    selectedOption: "",
    options: [
      { value: "hardware", label: "Hardware" },
      { value: "softare", label: "Software" },
      { value: "civil", label: "Civil" },
    ],
  },
  {
    name: "name two",
    note: "second note",
    date: "2016-07-08T12:43:00.000Z",
    file: File,
    fileName: "sample 12",
    filePath: "fileName2",
    selectedOption: "",
    options: [
      { value: "hardware2", label: "Hardware2" },
      { value: "softare2", label: "Software2" },
      { value: "civil2", label: "Civil2" },
    ],
  },
  {
    name: "name three",
    note: "third note",
    date: "2016-08-08T12:43:00.000Z",
    file: File,
    fileName: "sample 3",
    filePath: "fileName2",
    selectedOption: "",
    options: [
      { value: "hardware3", label: "Hardware3" },
      { value: "softare3", label: "Software3" },
      { value: "civil3", label: "Civil3" },
    ],
  },
];

const list = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
// Initialize an array to hold the state for each row's approveDates
const initialNeedByDatesArray = list.map(() => ({
  startDate: new Date(),
  endDate: new Date(),
}));

export default function TestPage() {
  const noteToSupplierRef = useRef<HTMLInputElement[]>([]);
  const [noteToSupplier, setNoteToSupplier] = useState<string[]>([]);

  const [data, setData] = useState(data1);

  //need by date
  const [needByDatesArray, setNeedByDatesArray] = useState(
    initialNeedByDatesArray
  );

  // Function to handle date change for a specific row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNeedByDateChange = (newValue: any, rowIndex: number) => {
    const updatedNeedByDatesArray = [...needByDatesArray];
    updatedNeedByDatesArray[rowIndex] = newValue;
    setNeedByDatesArray(updatedNeedByDatesArray);
  };
  //need by date

  useEffect(() => {
    const notesArray = data.map((item) => item.note);
    setNoteToSupplier(notesArray);

    const dateArray = data.map((item) => ({
      startDate: new Date(item.date),
      endDate: new Date(item.date),
    }));
    setNeedByDatesArray(dateArray);

    noteToSupplierRef.current = notesArray.map((note, index) => {
      return (
        noteToSupplierRef.current[index] || React.createRef<HTMLInputElement>()
      );
    });

    const newFileName = data.map((item) => item.fileName);
    setFileNames(newFileName);
  }, []);

  const handleNoteToSupplierChange = (value: string, index: number) => {
    const newNote = [...noteToSupplier];
    newNote[index] = value;
    setNoteToSupplier(newNote);
  };

  // Initial array with three null values

  const [fileNames, setFileNames] = useState<string[] | []>([]);
  const [fileList, setFileList] = useState<File[] | []>([]);
  const [selectedOptionList, setSelectedOptionList] = useState<string[] | []>(
    []
  );

  // const handleFileSelect = (file: File , index: number) => {
  //   const newFiles = [...fileList];
  //   newFiles[index] = file ; // Ensure file is null if not provided
  //   const newData = [...data];
  //   newData[index].file = file ; // Ensure file is null if not provided
  //   setFileList(newFiles);
  //   setData(newData);
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileSelect = (file: any, index: number) => {
    const newFiles = [...fileList];
    newFiles[index] = file;
    const newData = [...data];
    newData[index].file = file;
    setFileList(newFiles);
    setData(newData);
  };

  //drop down
  const [selectedDropDownList, setSelectedDropDownList] = useState<
    string[] | []
  >([]);

  //drop
  const handleSelect = (value: string, index: number) => {
    console.log(`Selected: ${value}`);
    const newSelectedDropDownList = [...selectedDropDownList];
    newSelectedDropDownList[index] = value;
    const newData = [...data];
    newData[index].selectedOption = value;
    setData(newData);
    setSelectedDropDownList(newSelectedDropDownList);

    // Do something with the selected value
  };
  //drop

  return (
    <div>
      <table className=" bg-red-100">
        <thead>
          <tr>
            <th>Name</th>
            <th>Note</th>
            <th>date</th>
            <th>file</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <CommonInputField
                  type="text"
                  width="w-44"
                  hint="note"
                  onChangeData={(value) =>
                    handleNoteToSupplierChange(value, index)
                  }
                  inputRef={{
                    current: noteToSupplierRef.current[index],
                  }}
                  value={noteToSupplier[index]} // Pass value prop here
                />
              </td>
              <td>
                <DateRangePicker
                  signle={true}
                  useRange={false}
                  placeholder="Date"
                  width="w-36"
                  value={needByDatesArray[index]} // Pass the dates from the state
                  onChange={(newValue) =>
                    handleNeedByDateChange(newValue, index)
                  } // Update the state on change
                />
              </td>
              <td>
                <FilePickerInput
                  onFileSelect={(newFile: File | null) =>
                    handleFileSelect(newFile!, index)
                  }
                  mimeType=".pdf, image/*"
                  initialFileName={fileNames[index]}
                  maxSize={5 * 1024 * 1024}
                />
              </td>

              <td>
                <DropDown
                  options={data[index].options}
                  onSelect={(newVal) => handleSelect(newVal, index)}
                  width="w-60"
                  hint="Select"
                  sval={selectedDropDownList[index] || ""}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => console.log(data[0])}>Click</button>
    </div>
  );
}
