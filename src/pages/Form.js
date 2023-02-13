import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import './Form.css';

const Form = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [firstNameErrorToggle, setFirstNameError] = useState(false);
    const [lastNameErrorToggle, setLastNameError] = useState(false);
    const [phoneNumberErrorToggle, setPhoneNumberError] = useState(false);
    const [addressErrorToggle, setAddressError] = useState(false);

    const [firstNameHelperText, setFirstNameHelperText] = useState("");
    const [lastNameHelperText, setLastNameHelperText] = useState("");
    const [phoneNumberHelperText, setPhoneNumberHelperText] = useState("");
    const [addressHelperText, setAddressHelperText] = useState("");


    const validateForm = () => {

        var isValidForm = true;

        if (firstName === "") {
            setFirstNameError(true);
            setFirstNameHelperText("This field is required");
            isValidForm = false;
        }

        if (lastName === "") {
            setLastNameError(true);
            setLastNameHelperText("This field is required");
            isValidForm = false;
        }

        if (phoneNumber === "") {
            setPhoneNumberError(true);
            setPhoneNumberHelperText("This field is required");
            isValidForm = false;
        } else if (phoneNumber.length !== 10) {
            setPhoneNumberError(true);
            setPhoneNumberHelperText("Phone number must be 10 digits.");
            isValidForm = false;
        }

        if (address === "") {
            setAddressError(true);
            setAddressHelperText("This field is required");
            isValidForm = false;
        }

        return isValidForm;

    }

    const acceptPhoneNumerInput = (value) => {
        if (!isNaN(value)) {
            setPhoneNumber(value);
        } else {
            setPhoneNumberHelperText("Only digits are allowed.");
        }
    }


    const submitForm = () => {

        const isFormValid = validateForm();

        if (isFormValid) {
            console.log("Form is valid");

            navigate('/pokemon_list');
        

        } else {
            console.log("Form is invalid");
        }

    }

    const clearForm = () => {

        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setAddress("");

        setFirstNameError(false);
        setLastNameError(false);
        setPhoneNumberError(false);
        setAddressError(false);

        setFirstNameHelperText("");
        setLastNameHelperText("");
        setPhoneNumberHelperText("");
        setAddressHelperText("");

    }



    return (
        <div className="form">

            <div className="header">
                Welcome to Nascent!
            </div>

            <div className="nameRow">
                <TextField
                    className="firstName"
                    label="First name"
                    variant="outlined"
                    value={firstName}
                    error={firstNameErrorToggle}
                    helperText={firstNameHelperText}
                    onChange={(event) => setFirstName(event.target.value)}
                    required />

                <TextField
                    className="lastName"
                    label="Last name"
                    variant="outlined"
                    value={lastName}
                    error={lastNameErrorToggle}
                    helperText={lastNameHelperText}
                    onChange={(event) => setLastName(event.target.value)}
                    required />
            </div>

            <TextField
                className="inputField"
                label="Phone number"
                variant="outlined"
                value={phoneNumber}
                error={phoneNumberErrorToggle}
                helperText={phoneNumberHelperText}
                onChange={(event) => acceptPhoneNumerInput(event.target.value)}
                inputProps={{ maxLength: 10 }}
                required />

            <TextField
                className="inputField"
                label="Address"
                variant="outlined"
                value={address}
                error={addressErrorToggle}
                helperText={addressHelperText}
                onChange={(event) => setAddress(event.target.value)}
                required />

            <div className="buttonRow">
                <Button
                    className="resetButton"
                    variant="text"
                    onClick={clearForm}>
                    Clear
                </Button>
                <Button
                    className="submitButton"
                    variant="contained"
                    onClick={submitForm} >
                    Submit
                </Button>
            </div>

        </div>
    );
}

export default Form;