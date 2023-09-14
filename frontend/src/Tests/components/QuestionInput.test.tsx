import { QuestionInput } from "../../components/QuestionInput";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock"


export type Props = {
  onSend(questions: string): void;
  setSelectedFile(value: File | null): void;
  disabled: boolean;
  placeholder?: string;
  clearOnSend?: boolean;
  selectedFile?: File | null;
  selectedDatapoints?: CheckboxValueType[];
};

// Helper function to render the component

// Mock setSelectedFile and onSend functions
const setSelectedFileMock = jest.fn();
const onSendMock = jest.fn();

beforeEach(() => {
  onSendMock.mockClear();
  setSelectedFileMock.mockClear();
});

describe(QuestionInput, () => {
  const defaultProps: Props = {
    onSend: onSendMock,
    setSelectedFile: setSelectedFileMock,
    disabled: false,
    placeholder: "Enter Prompt",
  };
  it("renders without crashing", () => {
    render(<QuestionInput {...defaultProps} />);
  });

  it('textbox should render without errors', () => {
    render(<QuestionInput {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter Prompt');
    const castedInputElement = inputElement as HTMLElement;
    expect(castedInputElement).toBeInTheDocument();
  });

  it('button is displayed and clicking ', () => {
    // Create a spy for the sendQuestion function
    render(<QuestionInput {...defaultProps} />);
    const sendButton = screen.getByLabelText('Ask question button');
    fireEvent.click(sendButton);
    expect(sendButton).toBeInTheDocument()
  });

  it('should make api calls thorough function sendQuestion if the input is present',async ()=>{
    const newProps: Props = {
      onSend: onSendMock,
      setSelectedFile: setSelectedFileMock,
      disabled: false,
      placeholder: "Enter Prompt",
      selectedFile: new File([""], "dummy.txt", { type: "text/plain" }),
      selectedDatapoints: ["policy_number","accident_code"]
    };
    render(<QuestionInput {...newProps} />);
    const sendButton = screen.getByLabelText('Ask question button');
    await fireEvent.click(sendButton);
    expect(onSendMock).toHaveBeenCalled();
    expect(onSendMock).toHaveBeenCalledTimes(1);

    // fetchMock.mockResponseOnce(JSON.stringify({prompt:"hello"}))

  })


  it('should not call onSend if the input is empty', () => {
    render(<QuestionInput {...defaultProps} />);
    const sendButton = screen.getByLabelText('Ask question button');

    fireEvent.click(sendButton);

    expect(onSendMock).not.toHaveBeenCalled();
  });

  it('should call antd modal warning if no file is selected', () => {
    render(<QuestionInput {...defaultProps} />);
    const sendButton = screen.getByLabelText('Ask question button');

    fireEvent.change(screen.getByPlaceholderText('Enter Prompt'), {
      target: { value: 'Test question' },
    });
    fireEvent.click(sendButton);

    expect(setSelectedFileMock).not.toHaveBeenCalled();
    expect(screen.getByText('Please upload a document first.')).toBeInTheDocument(); // Replace with the actual message shown in the modal
  });

});


