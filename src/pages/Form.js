// importing styles
import './Form.css';

import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Form = () => {

    const navigate = useNavigate();

    // hooks for form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    // hooks for setting form fields
    const [firstNameErrorToggle, setFirstNameError] = useState(false);
    const [lastNameErrorToggle, setLastNameError] = useState(false);
    const [phoneNumberErrorToggle, setPhoneNumberError] = useState(false);
    const [addressErrorToggle, setAddressError] = useState(false);

    // hooks for setting form fields' helper text
    const [firstNameHelperText, setFirstNameHelperText] = useState("");
    const [lastNameHelperText, setLastNameHelperText] = useState("");
    const [phoneNumberHelperText, setPhoneNumberHelperText] = useState("");
    const [addressHelperText, setAddressHelperText] = useState("");

    useEffect(() => {
        // loading form data on page load if there are any in local storage
        let userData = JSON.parse(localStorage.getItem("userData"));

        if (userData) {
            setFirstName(userData.firstName ?? "");
            setLastName(userData.lastName ?? "");
            setPhoneNumber(userData.phoneNumber ?? "");
            setAddress(userData.address ?? "");
        }
    }, []);

    const validateForm = () => {

        var isValidForm = true;

        // firstName validation
        if (firstName === "") {
            setFirstNameError(true);
            setFirstNameHelperText("This field is required");
            isValidForm = false;
        }

        // lastName validation
        if (lastName === "") {
            setLastNameError(true);
            setLastNameHelperText("This field is required");
            isValidForm = false;
        }

        // phoneNumber validation
        if (phoneNumber === "") {
            setPhoneNumberError(true);
            setPhoneNumberHelperText("This field is required");
            isValidForm = false;
        } else if (phoneNumber.length !== 10) {
            setPhoneNumberError(true);
            setPhoneNumberHelperText("Phone number must be 10 digits.");
            isValidForm = false;
        }

        // address validation
        if (address === "") {
            setAddressError(true);
            setAddressHelperText("This field is required");
            isValidForm = false;
        }

        return isValidForm;
    }

    const submitForm = () => {
        const isFormValid = validateForm();
        if (isFormValid) {
            navigate('/pokemon_list');
        }
    }

    const clearForm = () => {
        // clearing form fields
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setAddress("");

        // clearing from fields' error toggle
        setFirstNameError(false);
        setLastNameError(false);
        setPhoneNumberError(false);
        setAddressError(false);

        // clearing form field's helper texts
        setFirstNameHelperText("");
        setLastNameHelperText("");
        setPhoneNumberHelperText("");
        setAddressHelperText("");

        localStorage.setItem("userData", "{}");
    }

    const captureInput = (field, value) => {
        // checking if userData is already stored in local storage
        let userData = JSON.parse(localStorage.getItem("userData")) ?? {};

        // setting field values
        switch (field) {
            case "firstName":
                setFirstNameError(false);
                setFirstNameHelperText("");
                userData.firstName = value;
                setFirstName(value);
                break;
            case "lastName":
                setLastNameError(false);
                setLastNameHelperText("");
                userData.lastName = value;
                setLastName(value);
                break;
            case "phoneNumber":
                setPhoneNumberError(false);
                setPhoneNumberHelperText("");
                if (!isNaN(value)) {
                    userData.phoneNumber = value;
                    setPhoneNumber(value);
                } else {
                    setPhoneNumberHelperText("Only digits are allowed.");
                }
                break;
            case "address":
                setAddressError(false);
                setAddressHelperText("");
                userData.address = value;
                setAddress(value);
                break;
            default:
                break;
        }

        // saving form fields to local storage
        localStorage.setItem("userData", JSON.stringify(userData));
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
                    onChange={(event) => captureInput("firstName", event.target.value)}
                    required
                    autoFocus />

                <TextField
                    className="lastName"
                    label="Last name"
                    variant="outlined"
                    value={lastName}
                    error={lastNameErrorToggle}
                    helperText={lastNameHelperText}
                    onChange={(event) => captureInput("lastName", event.target.value)}
                    required />

            </div>

            <TextField
                className="inputField"
                label="Phone number"
                variant="outlined"
                value={phoneNumber}
                error={phoneNumberErrorToggle}
                helperText={phoneNumberHelperText}
                onChange={(event) => captureInput("phoneNumber", event.target.value)}
                inputProps={{ maxLength: 10 }}
                required />

            <TextField
                className="inputField"
                label="Address"
                variant="outlined"
                value={address}
                error={addressErrorToggle}
                helperText={addressHelperText}
                onChange={(event) => captureInput("address", event.target.value)}
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